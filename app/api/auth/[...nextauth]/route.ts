import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to your backend API to authenticate user
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"
          }/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Include cookies for cross-origin requests
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data?.data?.user) {
          console.error(
            "Authentication failed:",
            data?.message || "Invalid credentials",
            res.status,
            JSON.stringify(data)
          );
          return null;
        }

        // Return user object with required fields
        return {
          id: data.data.user.id, // Corrected from _id to id to match backend response
          name: data.data.user.name,
          email: data.data.user.email,
          role: data.data.user.roles[0] || "USER", // Use first role
          roles: data.data.user.roles || ["USER"],
          accessToken: data.accessToken || data.data.accessToken, // Check both locations
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Add properties to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
