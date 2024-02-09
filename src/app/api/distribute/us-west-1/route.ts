import { DistributeOptions } from '@/libs/utils';

export const runtime = 'edge';

export const preferredRegion = 'sfo1'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DistributeOptions<unknown>;
    const init = JSON.stringify(body);

    console.warn('Requesting', body.route, 'with', init);
    const response = await fetch(body.route, {
      method: 'POST',
      body: init,
    })
    return response
  } catch (e) {
    console.error('Error SFO1', e);
    return new Response('Error', { status: 500 });
  }
}

