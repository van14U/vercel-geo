import { geolocation } from '@vercel/edge';

export const runtime = 'edge';

export function GET(request: Request) {
  const geo = geolocation(request);
  return Response.json({ geo });
}
