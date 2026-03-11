// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/schemas/auth/signupSchema";
import { verifyUser } from "@/controllers/authController";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // On fusionne la config Edge
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);

        if (validatedCredentials.success) {
            // C'est safe ici car auth.ts tourne sur Node.js
            const result = await verifyUser(validatedCredentials.data);
            if (result.success) return result.user ?? null;
        }
        return null;
      },
    }),
  ],
});