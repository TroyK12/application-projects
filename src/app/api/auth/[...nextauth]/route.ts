import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
/*         CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: { 
                    label: "password", 
                    type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email
                }
            })
            if (user && user.password === credentials?.password) {
                  return Promise.resolve(user);
                } else {
                  return Promise.resolve(null);
                }
              },           
        }), */
    ],
    pages: {
        signIn: '/signin'
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


