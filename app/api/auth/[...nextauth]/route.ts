import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import GoogleProvider from "next-auth/providers/google";
import { UsersInformation } from "@/types/userInfomation.type";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      email: string;
      usersInformationId: string | null;
      usersInformation: UsersInformation | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
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
          return null;
        }

        try {
          const res = await axios.post<{
            data: {
              id: string;
              name: string;
              email: string;
              usersInformationId: string | null;
              usersInformation: UsersInformation | null;
            };
          }>(`${process.env.API_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          console.log("res", res.data?.data);
          const user = res.data?.data;

          if (!user?.id) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            usersInformationId: user.usersInformationId,
            usersInformation: user.usersInformation,
          };
        } catch (error) {
          const err = error as AxiosError;
          console.error("Login failed:", err.response?.data);
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
      console.log("GOOGLE USER", user);
      console.log("GOOGLE PROFILE", profile);
      console.log("GOOGLE ACCOUNT", account);
      if (account?.provider === "google") {
        const res = await axios.post(`${process.env.API_URL}/loginGoogle`, {
          email: user.email,
          name: user.name,
          image: user.image,
          googleId: profile?.sub,
        });

        const dbUser = res.data.data;

        user.id = dbUser.id;
        // console.log("DB USER:", dbUser);
        // (user as any).usersInformationId = dbUser.usersInformationId;
        // (user as any).usersInformation = dbUser.usersInformation;
      }

      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
