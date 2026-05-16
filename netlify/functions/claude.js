/**
 * Netlify Function: claude.js
 * Proxies requests from the browser to the Anthropic API.
 * The API key lives only in Netlify's environment — never in the browser.
 */

export default async (request, context) => {

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: { message: 'ANTHROPIC_API_KEY environment variable is not set.' } }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  // Remove web_search tool — it causes multi-round-trip latency that exceeds
  // Netlify function timeouts. Claude's training knowledge covers state-level
  // ECE market intelligence well enough for call prep purposes.
  if (body.tools) {
    delete body.tools;
  }
  // Cap tokens to keep response well under timeout
  body.max_tokens = Math.min(body.max_tokens || 1500, 1500);

  const anthropicResp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  const data = await anthropicResp.json();

  return new Response(JSON.stringify(data), {
    status: anthropicResp.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const config = {
  path: '/.netlify/functions/claude',
};
