import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { env } from "@/lib/env";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";


const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials.password) return null;

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email
                        }
                    })
                    if (!user) {
                        return null;
                    } 

                    const isValidPassword = await compare(credentials!.password, user?.password as string)
                    if (!isValidPassword) return null

                    return {
                        id: user.id + '',
                        email: user.email,
                    }
                } catch (error: any) {
                    console.error('Authorization error:', error);
                    return null;
                }
            },
        }),
    ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };


