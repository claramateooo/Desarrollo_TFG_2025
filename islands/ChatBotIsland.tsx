import { useEffect, useRef, useState } from "preact/hooks";
import { Bot, Hand, Expand, Minimize } from "https://esm.sh/lucide-preact@0.270.0?deps=preact@10.22.0";
import { marked } from "https://esm.sh/marked@9.1.6";

export default function ChatbotIsland() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("chatbotMessages");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", content: "Lo siento, hubo un error 😔" }]);
      console.log(err);
    }
  };

  return (
    <>
      <div class="chatbot-wrapper" aria-live="polite">
        <div
          class="chatbot-icon"
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex={0}
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(!open)}
        >
          <img
            src="https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937553.jpg"
            alt="Abrir chatbot"
          />
          <div class="chatbot-hint">Pregúntame lo que necesites</div>
        </div>

        {open && (
          <div
            class={`chatbot-window${expanded ? " expanded" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Ventana de chat"
          >
            <div class="chatbot-header">
              <Bot color="#4c61ffff" size={18} style={{ marginRight: "0.5rem" }} />
              UX-AiVisor Chat
              <button
                class="expand-button"
                title={expanded ? "Minimizar ventana" : "Expandir ventana"}
                aria-label={expanded ? "Minimizar ventana del chat" : "Expandir ventana del chat"}
                onClick={() => setExpanded(e => !e)}
              >
                {expanded
                  ? <Minimize size={20} color="#fff" />
                  : <Expand size={20} color="#fff" />
                }
              </button>
            </div>

            <div class="chatbot-body" ref={chatRef} role="log" aria-live="polite">
              <div class="chat-msg bot">
                <Hand
                  color="#b98610ff"
                  size={16}
                  style={{ marginRight: "0.4rem", verticalAlign: "middle" }}
                />
                ¿En qué puedo ayudarte?
              </div>
              {messages.map((msg, i) => (
                <div key={i} class={`chat-msg ${msg.role}`}>
                  {msg.role === "bot" ? (
                    <div
                      class="bot-markdown"
                      dangerouslySetInnerHTML={{ __html: marked(msg.content) }}
                    />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              ))}
            </div>

            <div class="chatbot-input">
              <label for="chatbot-input" class="sr-only">Escribe tu mensaje</label>
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onInput={(e) => setInput(e.currentTarget.value)}
                placeholder="Escribe tu mensaje..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                aria-label="Campo de entrada del chatbot"
              />
              <button onClick={handleSend} aria-label="Enviar mensaje al chatbot">
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
