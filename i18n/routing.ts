import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always', // /en/... and /bn/...
});

export type Locale = (typeof routing.locales)[number];
