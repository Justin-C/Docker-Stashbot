type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | Record<string, any>;
};

export type ErrorResponse = {
  error: string;
};

export async function fetchApi(url: string, options: RequestOptions = {}) {
  const { method = 'POST', headers = {}, body } = options; // default to POST

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let parsedResponse;
  // Check if response has content to parse
  if (response.headers.get('content-type')?.includes('application/json')) {
    parsedResponse = await response.json();
  } else {
    const parsedText = await response.text();
    parsedResponse = { error: parsedText } // If not JSON, parse as text
  }
  if (!response.ok) {
    throw parsedResponse;
  }

  return parsedResponse;
}
