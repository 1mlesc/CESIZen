import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = (auth?.user as any)?.role;
      const isAdmin = userRole === "ADMIN";
      
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin) {
        if (isLoggedIn && isAdmin) return true;
        if (isLoggedIn && !isAdmin) return Response.redirect(new URL('/dashboard', nextUrl));
        return false;
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role?.role || (user as any).role || "USER";
        token.firstName = (user as any).first_name;
        token.lastName = (user as any).family_name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).firstName = token.firstName as string;
        (session.user as any).lastName = token.lastName as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;