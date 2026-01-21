import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { UserInformation } from "@/src/types/userInfomation.type";

// เพิ่ม type สำหรับ session extension
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      usersInformationId: string | null;
      usersInformation: UserInformation | null;
      backendToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    usersInformationId?: string | null;
    usersInformation?: UserInformation | null;
    backendToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/user.birthday.read",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("[CREDENTIALS] Missing credentials");
          return null;
        }

        try {
          console.log(
            "[CREDENTIALS] Calling backend /login with email:",
            credentials.email,
          );
          console.log("[CREDENTIALS] API_URL:", process.env.API_URL);

          const res = await axios.post(`${process.env.API_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (!res.data.success || !res.data.data?.id) return null;

          const user = res.data.data;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            usersInformationId: user.usersInformationId,
            usersInformation: user.usersInformation,
            backendToken: res.data.token, // ✅ เอาจาก root response
          };
        } catch (error) {
          const err = error as AxiosError;
          console.error("[CREDENTIALS] Axios error:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      // ===== GOOGLE LOGIN =====
      if (account?.provider === "google" && profile) {
        const res = await axios.post(`${process.env.API_URL}/loginGoogle`, {
          email: profile.email,
          name: profile.name,
          googleId: profile.sub,
        });

        if (res.data?.data?.id) {
          token.id = String(res.data.data.id);
          token.name = res.data.data.name;
          token.email = res.data.data.email;
          token.usersInformationId = res.data.data.usersInformationId ?? null;
          token.usersInformation = res.data.data.usersInformation ?? null;
          token.backendToken = res.data.token;
        }

        return token;
      }

      // ===== CREDENTIALS LOGIN =====
      if (user) {
        token.id = String(user.id);
        token.name = user.name || "";
        token.email = user.email || "";
        token.usersInformationId = (user as any).usersInformationId ?? null;
        token.usersInformation = (user as any).usersInformation ?? null;
        token.backendToken = (user as any).backendToken; // ✅ สำคัญมาก
      }

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.usersInformationId = token.usersInformationId as any;
        session.user.usersInformation = token.usersInformation as any;
        session.user.backendToken = token.backendToken as string; // ✅
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
