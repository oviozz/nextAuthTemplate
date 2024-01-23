
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/utils/dbConnect";
import clientPromise from "@/utils/clientPromise";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                await connectDB();

                if (credentials == null) return null;

                try {
                    const {email, password} = credentials;

                    const user = await User.findOne({ email: email });

                    if (user) {

                        const isPasswordCorrect = await bcrypt.compare(
                            password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        }

                    }
                } catch (err) {
                    throw new Error(err);
                }

            }
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        },
    }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };