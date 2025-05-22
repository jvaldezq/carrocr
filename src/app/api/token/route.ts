import { getAccessToken } from '@auth0/nextjs-auth0';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const res = await getAccessToken({});
    return Response.json(res.accessToken);
  } catch {
    return Response.json(false);
  }
}
