import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnWhoFormCreate = nextUrl.pathname.startsWith('/WhoForm/create');
      const isOnWhoFormEdit = nextUrl.pathname.startsWith('/WhoForm/edit');
      const isOnAuth = nextUrl.pathname.startsWith('/auth');
      if (isOnWhoFormCreate || isOnWhoFormEdit) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
