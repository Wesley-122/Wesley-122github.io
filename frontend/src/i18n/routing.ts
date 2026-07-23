import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/who-we-are': {
      'zh-CN': '/who-we-are',
      en: '/who-we-are',
    },
    '/products-services': {
      'zh-CN': '/products-services',
      en: '/products-services',
    },
    '/industry-solutions': {
      'zh-CN': '/industry-solutions',
      en: '/industry-solutions',
    },
    '/cases': {
      'zh-CN': '/cases',
      en: '/cases',
    },
    '/news': {
      'zh-CN': '/news',
      en: '/news',
    },
    '/careers': {
      'zh-CN': '/careers',
      en: '/careers',
    },
    '/contact': {
      'zh-CN': '/contact',
      en: '/contact',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof (typeof routing)['pathnames'];
