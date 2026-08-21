import { createFileRoute } from "@tanstack/react-router";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are "AYMOXI Assistant", the friendly AI concierge for AYMOXI — a premium software company offering web development, mobile apps, AI solutions, cloud hosting, SaaS platforms, ERP, POS, UI/UX design, digital marketing, and cybersecurity.
- Founder & CEO: Shafqat Rasool. Co-Founder & Managing Director: Noman.
- Answer in the same language the user writes in (English, Urdu, Roman Urdu, Hindi, Arabic — all fine).
- Be concise, warm, and helpful. Use short paragraphs and bullets when useful.
- For pricing: starter from $499, growth from $1,499/mo, enterprise custom. Offer a free consultation.
- Contact: info@aymoxi.com · USA +1 720 794 1888. Office: 2nd Floor, Malik Plaza, In front of TCS Office, Hassan Road, Jaranwala, Faisalabad, Pakistan.
- If the user asks about topics unrelated to AYMOXI, still help them briefly.
- Never claim to be human. You are an AI assistant.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const raw = await request.text();
          if (raw.length > 20000) return new Response("Payload too large", { status: 413 });
          let body: { messages?: unknown };
          try {
            body = JSON.parse(raw) as { messages?: unknown };
          } catch {
            return new Response("Invalid JSON", { status: 400 });
          }
          if (!Array.isArray(body.messages) || body.messages.length === 0) {
            return new Response("Invalid messages", { status: 400 });
          }
          if (body.messages.length > 20) {
            return new Response("Too many messages", { status: 400 });
          }
          const messages: ChatMsg[] = [];
          for (const m of body.messages) {
            if (typeof m !== "object" || m === null) return new Response("Invalid message", { status: 400 });
            const { role, content } = m as { role?: unknown; content?: unknown };
            if (role !== "user" && role !== "assistant") return new Response("Invalid role", { status: 400 });
            if (typeof content !== "string" || content.trim().length === 0 || content.length > 2000) {
              return new Response("Invalid message content", { status: 400 });
            }
            messages.push({ role, content });
          }
          const key =
            process.env.LOVABLE_API_KEY ||
            process.env.VITE_LOVABLE_API_KEY ||
            process.env.AI_GATEWAY_API_KEY ||
            "";
          if (!key) {
            return Response.json(
              {
                reply:
                  "I'm temporarily offline on this deployment because the AI key isn't configured here. Please email info@aymoxi.com or call +1 720 794 1888 and our team will help you right away.",
                degraded: true,
              },
              { status: 200 },
            );
          }

          const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
              "Lovable-API-Key": key,
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            }),
          });

          if (!resp.ok) {
            const text = await resp.text();
            console.error(`AI gateway error [${resp.status}]: ${text}`);
            if (resp.status === 429 || resp.status === 402) {
              return Response.json(
                {
                  reply:
                    resp.status === 429
                      ? "We're getting a lot of requests right now — please try again in a few seconds."
                      : "Our AI assistant is temporarily unavailable. Please email info@aymoxi.com and we'll reply fast.",
                  degraded: true,
                },
                { status: 200 },
              );
            }
            return Response.json({ error: text || "Upstream error", status: resp.status }, { status: 502 });
          }
          const data = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
          const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
          return Response.json({ reply });
        } catch (e) {
          console.error("chat handler failed", e);
          return Response.json(
            {
              reply:
                "Sorry — I couldn't reach the assistant just now. Please email info@aymoxi.com or call +1 720 794 1888.",
              degraded: true,
            },
            { status: 200 },
          );
        }
      },
    },
  },
});
