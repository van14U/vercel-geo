import { DistributeOptions } from '@/libs/utils';

export const runtime = 'edge';

export const preferredRegion = 'sfo1'

export async function POST(request: Request) {
  try {
    console.log("Requesting SFO1");
    const body = (await request.json()) as DistributeOptions<unknown>;
    const init = JSON.stringify(body);

    console.warn('Requesting', body.route, 'with', init);
    const response = await fetch(body.route, {
      method: 'POST',
      body: init,
    })
    return response
  } catch (e) {
    console.error('Error SFO1', (e as Error)?.message);
    return new Response('Error', { status: 500 });
  }
}

