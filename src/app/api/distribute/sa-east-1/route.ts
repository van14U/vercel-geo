import { DistributeOptions } from '@/libs/utils';

export const runtime = 'edge';

export const preferredRegion = 'gru1'

export async function POST(request: Request) {
  const body = (await request.json()) as DistributeOptions<unknown>;
  const init = JSON.stringify(body);

  const response = await fetch(body.route, {
    method: 'POST',
    body: init,
  })
  return response
}

