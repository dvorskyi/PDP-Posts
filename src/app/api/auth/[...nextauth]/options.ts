import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter username" },
                password: { label: "Password", type: "password", placeholder: "Enter password" }
            },
            async authorize(credentials) {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                const user = await res.json();
                
                if (user) {
                    return user
                } else {
                    return null
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user}) {
            return ({...token, ...user})
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        }
    },
    pages: {
        signIn: "/auth/sign-in",
    }
}   