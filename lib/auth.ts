import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour session duration
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("The provided credentials are invalid.");
        }

        const user = await prisma.employee.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error(
            JSON.stringify({
              type: "username",
              message: "Sorry, the username you entered does not exist.",
            })
          );
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectPassword) {
          throw new Error(
            JSON.stringify({
              type: "password",
              message: "Sorry, the password you entered is incorrect.",
            })
          );
        }

        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.employee.findFirst({
        where: { id: token.sub as string },
      });

      if (!user) {
        delete token.sub;
        return token;
      }

      return {
        ...token,
        sub: user.id,
        id_number: user.id_number,
        username: user.username,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        suffix: user.suffix,
        email: user.email,
        contact_number: user.contact_number,
        department: user.department_id,
        employment_status: user.employment_status,
        date_employed: user.date_employed,
        salary: user.salary,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.sub,
          id_number: token.id_number,
          username: token.username,
          role: token.role,
          first_name: token.first_name,
          last_name: token.last_name,
          middle_name: token.middle_name,
          suffix: token.suffix,
          email: token.email,
          contact_number: token.contact_number,
          department: token.department,
          employment_status: token.employment_status,
          date_employed: token.date_employed,
          salary: token.salary,
          vacation_leave: token.vacation_leave,
          sick_leave: token.sick_leave,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
