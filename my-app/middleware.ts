import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // Importe la config LÉGÈRE de NextAuth

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};