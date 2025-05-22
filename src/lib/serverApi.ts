import { getAccessToken } from '@auth0/nextjs-auth0';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

interface ServerApiProps<TParams = Record<string, unknown> | AutoFiltersType> {
  path: string;
  params?: TParams;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  revalidate?: number;
  cache?: RequestCache;
  body?: string | object | null;
  requiresAuth?: boolean;
}

export type ServerApiResponse<T> = {
  data?: T;
  message?: string;
  status?: number;
  details?: string;
};

export const serverApi = async <
  TResponse = unknown,
  TParams = Record<string, unknown> | AutoFiltersType,
>(
  props: ServerApiProps<TParams>,
): Promise<ServerApiResponse<TResponse>> => {
  const {
    path,
    params,
    method = 'GET',
    revalidate = 60,
    cache = 'default',
    body,
    requiresAuth = false,
  } = props;

  let token: string | undefined;

  if (requiresAuth) {
    try {
      const authResult = await getAccessToken({});
      token = authResult?.accessToken;

      if (!token) {
        console.error(`Unauthorized: No token ${path}`);
        return { status: 401, message: 'Unauthorized: No token' };
      }
    } catch (error) {
      console.error(`Unauthorized: Token fetch failed ${path}`, error);
      return { status: 401, message: 'Unauthorized: Token fetch failed' };
    }
  }

  let parametersString = '';
  if (params) {
    const stringifiedParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]);
    parametersString = `?${new URLSearchParams(stringifiedParams).toString()}`;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${parametersString}`,
      {
        method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(typeof body === 'object' &&
            body !== null && { 'Content-Type': 'application/json' }),
        },
        body:
          typeof body === 'object' && body !== null
            ? JSON.stringify(body)
            : (body as BodyInit | null | undefined),
        next: { revalidate },
        cache,
      },
    );

    if (res.status === 401) {
      console.error(`Unauthorized`);
      return { status: 401, message: 'Unauthorized' };
    }

    if (!res.ok) {
      console.error(
        `Fetch message: ${res.statusText}. Fetch failed for ${path}`,
      );
      return {
        status: res.status,
        message: `Fetch message: ${res.statusText}`,
      };
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = (await res.json()) as TResponse;
      return { data };
    }
    console.error(`Expected JSON but received different content type 500`);
    return {
      status: 500,
      message: 'Expected JSON but received different content type',
    };
  } catch (error) {
    console.error(`serverApi: Fetch failed for ${path}`, error);
    return { status: 500, message: 'Network or server error' };
  }
};
