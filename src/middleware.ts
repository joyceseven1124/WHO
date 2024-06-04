import { clientConfig, serverConfig } from '@/config';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/auth/register', '/auth/login', '/', '/WhoForm/view'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      const LOGIN_PATHS = ['/auth/register', '/auth/login'];
      if (LOGIN_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      return redirectToLogin(request, {
        path: '/auth/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      return redirectToLogin(request, {
        path: '/auth/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
