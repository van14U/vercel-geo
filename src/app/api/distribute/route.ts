import { geolocation } from '@vercel/edge';

export const runtime = 'edge';

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function POST(request: Request) {
  const body = await request.json()
  const geo = geolocation(request);
  const init = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  console.log({ geo, body });
  const endpoints = [
    '/api/distribute/us-east-1', // Washington D.C., USA
    '/api/distribute/us-east-2', // Cleveland, USA
    '/api/distribute/us-west-1', // San Francisco, USA
    '/api/distribute/us-west-2', // Portland, USA
    '/api/distribute/sa-east-1', // São Paulo, Brazil
    '/api/distribute/eu-north-1', // Stockholm, Sweden
    '/api/distribute/eu-west-1', // Dublin, Ireland
    '/api/distribute/eu-west-2', // London, UK
    '/api/distribute/eu-west-3', // Paris, France
    '/api/distribute/eu-central-1', // Frankfurt, Germany
    '/api/distribute/ap-northeast-1', // Tokyo, Japan
    '/api/distribute/ap-northeast-2', // Seoul, South Korea
    '/api/distribute/ap-northeast-3', // Osaka, Japan
    '/api/distribute/ap-southeast-1', // Singapore
    '/api/distribute/ap-southeast-2', // Sydney, Australia
    '/api/distribute/ap-south-1', // Mumbai, India
    '/api/distribute/ap-east-1', // Hong Kong
    '/api/distribute/af-south-1', // Cape Town, South Africa
  ].map(route => {
    const url = getBaseUrl() + route;
    return url;
  }
  ).map(url => fetch(url, init).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    return response
  }).catch(error => {
    console.error(`Failed to distribute to ${url}: ${error.message ?? ''}`);
    throw error;
  }))

  const responses = await Promise.allSettled(endpoints)
  const ok = responses.every(response => response.status === 'fulfilled')
  if (!ok) {
    return Response.json({ ok: false }, { status: 500 })
  }
  return Response.json({ ok })
}
