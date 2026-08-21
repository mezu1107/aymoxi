import { useEffect, useRef, useState } from "react";
import { Send, X, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about pricing",
  "How can AI help my business?",
  "Book a free consultation",
];

export function AIChatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm AYMOXI Assistant 👋 Ask me anything about our services, pricing, or how we can help your business grow." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  if (!open) return null;

  async function send(text: string) {

    const clean = text.trim();
    if (!clean || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply: string };
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry — I'm having trouble right now. Please try again in a moment or email info@aymoxi.com." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="AYMOXI AI Assistant"
      className="fixed bottom-[9.5rem] right-4 z-50 flex h-[min(70vh,560px)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white shadow-luxury animate-fade-in lg:bottom-24 lg:right-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-gradient-to-br from-espresso to-cocoa px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-copper text-espresso">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-display text-sm font-bold leading-tight">AYMOXI Assistant</p>
                <p className="flex items-center gap-1.5 text-[10px] text-copper">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper animate-pulse" /> Online · AI powered
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>


          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-sand/40 px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "rounded-br-md bg-cocoa text-white"
                      : "rounded-bl-md bg-white text-espresso"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-cocoa" />
                </div>
              </div>
            )}
            {messages.length <= 1 && !loading && (
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-cocoa/20 bg-white px-3 py-1.5 text-xs text-espresso transition hover:border-copper hover:bg-copper/10"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-espresso/10 bg-white px-3 py-3"
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 rounded-full border border-espresso/15 bg-sand/40 px-4 py-2.5 text-sm text-espresso placeholder:text-espresso/40 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="grid h-10 w-10 place-items-center rounded-full bg-cocoa text-copper transition hover:bg-espresso disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
    </div>
  );
}

