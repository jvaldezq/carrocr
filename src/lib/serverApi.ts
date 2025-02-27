interface ServerApiProps {
  path: string;
  params?: never; //TODO NEED TO FIX TYPE
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  revalidate?: number;
  token?: string;
  cache?: RequestCache;
}

export const serverApi = async (props: ServerApiProps) => {
  try {
    const {
      path,
      params,
      method = 'GET',
      revalidate = 60,
      token,
      cache = 'default',
    } = props;
    const parameters = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${parameters}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        method,
        next: { revalidate },
        cache,
      },
    );

    if (!res.ok) {
      console.error(res);
      throw new Error(`Failed to fetch data from ${path}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
