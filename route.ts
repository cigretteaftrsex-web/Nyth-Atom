import { NextRequest, NextResponse } from 'next/server';

const ATOM_BASE_URL = 'https://store.atom.com.mm';

async function handleRequest(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const searchParams = req.nextUrl.searchParams.toString();
  const authHeader = req.headers.get('authorization');
  
  let body = null;
  if (req.method === 'POST') {
    body = await req.json();
  }

  const response = await fetch(`${ATOM_BASE_URL}/${path}?${searchParams}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'user-agent': 'MyTM/4.13.0/Android/30',
      'accept': 'application/json, text/plain, */*',
      'x-server-select': 'production',
      ...(authHeader && { 'authorization': authHeader }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}

export const GET = handleRequest;
export const POST = handleRequest;
