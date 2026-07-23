import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocaleFromParams(params: { locale?: string } | undefined): 'zh-CN' | 'en' {
  const locale = params?.locale;
  if (locale === 'zh-CN' || locale === 'en') return locale;
  return 'zh-CN';
}

export function getAlternateLocale(locale: 'zh-CN' | 'en'): 'zh-CN' | 'en' {
  return locale === 'zh-CN' ? 'en' : 'zh-CN';
}

export function getLocalizedValue<T extends { zh: string; en: string }>(
  obj: T | undefined,
  locale: 'zh-CN' | 'en',
  fallback = ''
): string {
  if (!obj) return fallback;
  return locale === 'zh-CN' ? obj.zh : obj.en;
}

export function formatDate(dateStr: string, locale: 'zh-CN' | 'en'): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString(locale === 'zh-CN' ? 'zh-CN' : 'en-US', options);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function buildUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');
  return `${base}/${normalizedPath}`;
}

export function getImageUrl(strapiUrl: string): string {
  if (strapiUrl.startsWith('http')) return strapiUrl;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${baseUrl}${strapiUrl}`;
}
