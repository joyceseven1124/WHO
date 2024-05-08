// src/auth.ts
import { authConfig } from '@/src/auth.config';
import { User } from '@/src/lib/definitions';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';
import { signInHandle } from './lib/handleData/HandleAuth';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    // google({
    //   clientId: process.env.NEXT_GOOGLE_AUTH_CLIENT_ID ?? '',
    //   clientSecret: process.env.NEXT_GOOGLE_AUTH_CLIENT_SECRET ?? '',
    // }),

    Credentials({
      async authorize(credentials) {
        if (
          credentials.id &&
          typeof credentials.id === 'string' &&
          credentials.password &&
          typeof credentials.password === 'string'
        ) {
          let loginRes = {
            success: true,
            data: {
              user: {
                EMAIL: credentials.id,
              },
            },
          };

          // Failed logging in
          if (!loginRes.success) return null;
          // Successful log in
          const user = {
            email: loginRes.data.user.EMAIL ?? '',
          } as User;
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === 'update' && session) {
        token = { ...token, user: session };
        return token;
      }
      return token;
    },
    async redirect(params: { url: string; baseUrl: string }) {
      const { url, baseUrl } = params;
      return Promise.resolve(baseUrl);
    },
  },
});
