export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages required' }), { status: 400 });
    }

    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) {
      return new Response(JSON.stringify({ error: 'no user message found' }), { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch('https://emaniqbal-portfolio.hf.space/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ question: lastUserMsg.content }),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: `Chat backend: ${res.status} ${text}` }), { status: 502 });
    }

    return new Response(res.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }),
      { status: 500 }
    );
  }
}
