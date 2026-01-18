import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { UserInformation } from "@/types/userInfomation.type";

// เพิ่ม type สำหรับ session extension
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      usersInformationId: string | null;
      usersInformation: UserInformation | null;
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
  }
}

export const authOptions: NextAuthOptions = {
  // เพิ่ม debug สำหรับ production (จะ log เฉพาะ error ใน prod)
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

          const res = await axios.post<{
            success: boolean;
            data: {
              id: string;
              name: string;
              email: string;
              usersInformationId: string | null;
              usersInformation: UserInformation | null;
            };
          }>(`${process.env.API_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          console.log("[CREDENTIALS] Backend response:", res.data);

          if (!res.data.success || !res.data.data?.id) {
            console.error("[CREDENTIALS] Backend login failed:", res.data);
            return null;
          }

          const user = res.data.data;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            usersInformationId: user.usersInformationId,
            usersInformation: user.usersInformation,
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
    async signIn({ user, account, profile }) {
      console.log("[SIGNIN] Provider:", account?.provider);
      console.log("[SIGNIN] GOOGLE USER:", user);
      console.log("[SIGNIN] GOOGLE PROFILE:", profile);
      console.log("[SIGNIN] GOOGLE ACCOUNT:", account);

      if (account?.provider === "google") {
        try {
          console.log(
            "[SIGNIN] Calling backend /loginGoogle with email:",
            user.email,
          );

          const res = await axios.post<{
            success: boolean;
            data: {
              id: string;
              name: string;
              email: string;
              usersInformationId: string | null;
              usersInformation: UserInformation | null;
            };
          }>(`${process.env.API_URL}/loginGoogle`, {
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: profile?.sub,
          });

          console.log("[SIGNIN] Backend /loginGoogle response:", res.data);

          if (!res.data.success || !res.data.data?.id) {
            console.error("[SIGNIN] Backend sync failed:", res.data);
            // ถ้า backend error ยังให้ login ได้ (ไม่บังคับ sync)
            // return true; // หรือ return false ถ้าต้องการให้ fail
          } else {
            const dbUser = res.data.data;

            user.id = dbUser.id;
            (user as any).usersInformationId = dbUser.usersInformationId;
            (user as any).usersInformation = dbUser.usersInformation;
          }
        } catch (error) {
          const err = error as AxiosError;
          console.error("[SIGNIN] Axios error in /loginGoogle:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
          });
          // ถ้า backend ล่ม ยังให้ login ผ่านได้ (optional)
          // return true;
        }
      }

      return true; // ให้ signIn ผ่านเสมอ (หรือ false ถ้าต้องการ fail เมื่อ backend error)
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
        token.usersInformationId = (user as any).usersInformationId;
        token.usersInformation = (user as any).usersInformation;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.usersInformationId = token.usersInformationId as
          | string
          | null;
        session.user.usersInformation = token.usersInformation as any;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
