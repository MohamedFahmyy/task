"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi! I'm Mazin's portfolio assistant. Ask me anything about his projects, skills, or experience with React, Laravel, or Docker.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  const getNewId = () => {
    messageIdRef.current += 1;
    return `msg-${messageIdRef.current}`;
  };

  const suggestionPrompts = [
    "What are your core skills?",
    "Tell me about the AI Learning Platform.",
    "Do you have Laravel & AWS experience?",
    "How can I contact you?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessageId = getNewId();
    const newMsg: Message = {
      id: userMessageId,
      sender: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to communicate with the portfolio assistant.");
      }

      const aiMessageId = getNewId();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          sender: "ai",
          text: data.reply || "I didn't receive a response.",
        },
      ]);
    } catch (err: unknown) {
      console.error("Chatbot communication error:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please check your setup.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="contact" className="chat-section">
      <div className="chat-container">
        <div className="section-header">
          <span className="section-tag">Interactive</span>
          <h2 className="section-title">Chat with My Portfolio AI</h2>
          <p className="section-desc">
            Learn more about my credentials, tech stacks, or get in touch.
          </p>
        </div>

        <div className="chat-card">
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-avatar">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <div className="chat-status-info">
              <h4>Mazin&apos;s Assistant</h4>
              <span className="status-online">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty-state">
                <p>No messages yet. Ask me a question below!</p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message-bubble ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message-bubble ai loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {error && (
              <div className="chat-error-notice">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Prompts */}
          <div className="chat-suggestions">
            {suggestionPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className="suggestion-btn"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleFormSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about my work..."
              disabled={isLoading}
              className="chat-input-field"
              aria-label="Message input for chatbot"
              required
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="chat-send-btn"
              aria-label="Send query"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
