// serverApi.ts
import { getAccessToken } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

// Define a more specific type for parameters accepted by URLSearchParams
// This is generally Record<string, string | string[] | number | boolean | null | undefined>
// but URLSearchParamsInit typing is a bit complex. Mapping values to string is safest.
// Let's use a generic TParams that defaults to a common case, but the function
// implementation will ensure values are strings for URLSearchParams.

interface ServerApiProps<TParams = Record<string, unknown> | AutoFiltersType> {
  // TParams generic for the params object type
  path: string;
  params?: TParams;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  revalidate?: number;
  cache?: RequestCache;
  body?: string | object | null; // Allow object, string, or null body
  requiresAuth?: boolean; // Flag to indicate if token is needed
}

// Use generics for both the expected response type (TResponse)
// and the parameters type (TParams)
export const serverApi = async <
  TResponse = unknown,
  TParams = Record<string, unknown> | AutoFiltersType,
>(
  props: ServerApiProps<TParams>,
): Promise<TResponse | null> => {
  const {
    path,
    params,
    method = 'GET',
    revalidate = 60,
    cache = 'default',
    body,
    requiresAuth = false, // Assume most API calls need auth unless specified
  } = props;

  let token: string | undefined = undefined; // Explicitly type token

  if (requiresAuth) {
    try {
      const authResult = await getAccessToken({});
      token = authResult?.accessToken;

      if (!token) {
        console.error(
          `serverApi: Authentication required for ${path}, but no token found.`,
        );
        redirect('/401');
      }
    } catch (error) {
      console.error(`serverApi: Failed to get access token for ${path}`, error);
      redirect('/401');
    }
  }

  // --- Fix for params 'any' type ---
  let parametersString = '';
  if (params) {
    // Map params object entries to [key, stringified_value] pairs
    // This correctly formats the data for URLSearchParams and removes the 'any' cast
    const stringifiedParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null) // Optional: filter out null/undefined params
      .map(([key, value]) => [key, String(value)]); // Ensure value is a string

    parametersString = `?${new URLSearchParams(stringifiedParams).toString()}`;
  }
  // --- End Fix for params 'any' type ---

  try {
    const fetchOptions: RequestInit = {
      method,
      headers: {
        // Set Authorization header only if token exists
        ...(token && { Authorization: `Bearer ${token}` }),
        // Add Content-Type header if the body is an object (implying JSON)
        ...(typeof body === 'object' &&
          body !== null && { 'Content-Type': 'application/json' }),
        // Add other default headers here if needed
      },
      // Stringify body if it's an object
      body:
        typeof body === 'object' && body !== null
          ? JSON.stringify(body)
          : (body as BodyInit | null | undefined), // Cast body to a valid type for fetch
      next: { revalidate },
      cache,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${parametersString}`,
      fetchOptions,
    );

    if (!res.ok) {
      console.error(`serverApi: HTTP error! status: ${res.status} for ${path}`);
      // Throwing the error is often better for more specific error handling upstream
      // throw new Error(`Failed to fetch data from ${path}, status: ${res.status}`);
      redirect('/error');
    }

    // Handle 204 No Content explicitly if your API uses it
    // if (res.status === 204) {
    //   return null; // Or undefined, depending on what represents "no data"
    // }

    // Ensure response has a body before trying to parse JSON
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Use 'as TResponse' cast here - this is safe because the caller
      // specifies TResponse, and we assume the API returns that shape.
      // The cast is necessary because res.json() returns 'any'.
      return (await res.json()) as TResponse;
    } else {
      // Handle non-JSON responses if necessary
      console.warn(
        `serverApi: Received non-JSON response for ${path}. Returning null.`,
      );
      // If you need the raw text, you could return await res.text() instead, but
      // the generic TResponse expects an object type, so null is safer.
      redirect('/error');
    }
  } catch (error) {
    console.error(`serverApi: Failed to fetch data from ${path}`, error);
    // Re-throwing the error is often better for debugging and handling upstream
    // throw error;
    redirect('/error'); // Keeping null return for consistency
  }
};
