import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import UserModel from "@/models/user";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbconnect";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",

            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });
                    if (!user) {
                        throw new Error("NO user found with this Email/Username")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your email before login")
                    }
                    const isPassowardCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPassowardCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }

            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID !,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id,
                    session.user.isAcceptingMessages = token.isAcceptingMessages,
                    session.user.isVerified = token.isVerified,
                    session.user.username = token.username
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(),
                    token.isVerified = user.isVerified,
                    token.username = user.username,
                    token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}