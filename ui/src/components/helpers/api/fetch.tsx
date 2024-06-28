type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | Record<string, any>;
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

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message || 'Something went wrong');
  }

  return parsedResponse;
}