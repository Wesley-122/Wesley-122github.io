// Centralized Strapi API Client for Next.js
// Handles all CMS data fetching with ISR support

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_URL = `${STRAPI_URL}/api`;

export interface FetchOptions {
  locale?: string;
  populate?: string | string[] | Record<string, unknown>;
  filters?: Record<string, unknown>;
  pagination?: { page: number; pageSize: number };
  sort?: string | string[];
  fields?: string[];
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

function buildQueryString(options: FetchOptions): string {
  const params = new URLSearchParams();

  if (options.locale) {
    params.append('locale', options.locale);
  }

  if (options.populate) {
    if (typeof options.populate === 'string') {
      params.append('populate', options.populate);
    } else if (Array.isArray(options.populate)) {
      params.append('populate', options.populate.join(','));
    } else {
      // Deep population object - use bracket notation
      const flattenPopulate = (obj: Record<string, unknown>, prefix = 'populate'): void => {
        for (const [key, value] of Object.entries(obj)) {
          const paramKey = `${prefix}[${key}]`;
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenPopulate(value as Record<string, unknown>, paramKey);
          } else {
            params.append(paramKey, String(value));
          }
        }
      };
      flattenPopulate(options.populate);
    }
  }

  if (options.filters) {
    const flattenFilters = (obj: Record<string, unknown>, prefix = 'filters'): void => {
      for (const [key, value] of Object.entries(obj)) {
        const paramKey = `${prefix}[${key}]`;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flattenFilters(value as Record<string, unknown>, paramKey);
        } else {
          params.append(paramKey, String(value));
        }
      }
    };
    flattenFilters(options.filters);
  }

  if (options.pagination) {
    params.append('pagination[page]', String(options.pagination.page));
    params.append('pagination[pageSize]', String(options.pagination.pageSize));
  }

  if (options.sort) {
    const sortValue = Array.isArray(options.sort) ? options.sort.join(',') : options.sort;
    params.append('sort', sortValue);
  }

  if (options.fields) {
    params.append('fields', options.fields.join(','));
  }

  return params.toString();
}

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate = 60
): Promise<T> {
  try {
    const queryString = buildQueryString(options);
    const url = `${STRAPI_API_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate },
    });

    if (!res.ok) {
      console.error(`Strapi fetch error: ${res.status} ${url}`);
      throw new Error(`Failed to fetch from CMS: ${res.statusText}`);
    }

    const json = await res.json();
    return json as T;
  } catch (error) {
    console.error(`API Client Error [${endpoint}]:`, error);
    throw error;
  }
}

export async function fetchCollection<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate = 60
): Promise<PaginatedResult<T>> {
  const data = await fetchAPI<{
    data: { id: number; attributes: T }[];
    meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
  }>(endpoint, options, revalidate);

  return {
    data: (data.data || []).map((item) => ({ id: item.id, ...item.attributes })),
    pagination: data.meta?.pagination || { page: 1, pageSize: 25, pageCount: 0, total: 0 },
  };
}

export async function fetchSingle<T>(
  endpoint: string,
  options: FetchOptions = {},
  revalidate = 3600
): Promise<T | null> {
  const data = await fetchAPI<{
    data: { id: number; attributes: T } | null;
  }>(endpoint, options, revalidate);

  if (!data.data) return null;
  return { id: data.data.id, ...data.data.attributes } as T;
}
