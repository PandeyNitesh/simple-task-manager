import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "~/server/db";
//@ts-ignore
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        //@ts-ignore
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          //@ts-ignore
          credentials.password,
          //@ts-ignore
          user.password,
        );
        return isValid
          ? {
              id: user.id,
              email: user.email,
              name: user.name,
              //@ts-ignore
              theme: user.theme,
            }
          : null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    //@ts-ignore
    signUp: "/signup",
    dashboard: "/dashboard",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.name;
        //@ts-ignore
        token.theme = user.theme;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        //@ts-ignore
        session.user.username = token.name;
        //@ts-ignore
        session.user.theme = token.theme;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
