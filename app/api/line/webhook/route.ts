import crypto from "crypto";

type LineEvent = {
  replyToken?: string;
  type: string;
  message?: { type: string; text?: string };
};

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";

async function verifySignature(rawBody: string, signature: string) {
  const hmac = crypto.createHmac("sha256", CHANNEL_SECRET);
  hmac.update(Buffer.from(rawBody, "utf8"));
  const expected = hmac.digest("base64");
  return expected === signature;
}

async function replyMessage(replyToken: string, text: string) {
  const res = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text,
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LINE reply failed: ${res.status} ${body}`);
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("x-line-signature") || "";
  const rawBody = await request.text();

  if (!CHANNEL_SECRET || !CHANNEL_ACCESS_TOKEN) {
    return new Response(
      JSON.stringify({ error: "LINE credentials not configured" }),
      { status: 500 }
    );
  }

  const ok = await verifySignature(rawBody, signature);
  if (!ok) {
    return new Response(JSON.stringify({ error: "invalid signature" }), {
      status: 401,
    });
  }

  let payload: { events?: LineEvent[] } = {};
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
    });
  }

  const events = payload.events || [];
  for (const ev of events) {
    try {
      if (
        ev.type === "message" &&
        ev.message?.type === "text" &&
        ev.replyToken
      ) {
        // simple echo responder
        await replyMessage(ev.replyToken, `Echo: ${ev.message.text}`);
      }
    } catch (err) {
      console.error("handler error", err);
    }
  }

  return new Response(JSON.stringify({ result: "ok" }), { status: 200 });
}

export const runtime = "edge";
