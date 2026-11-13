import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Detects locale, redirects bare paths to /en or /bn, and reads the NEXT_LOCALE cookie.
export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
