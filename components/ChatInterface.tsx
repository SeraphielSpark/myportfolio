import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { sendMessageToGemini } from "../services/geminiService";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Greetings. I am Michael's AI Assistant. Ask me anything about his projects, skills, or specialized chatbot architectures.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(messages, input);
      const botMsg: ChatMessage = {
        role: "model",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto bg-tech-panel border border-neon-blue/30 rounded-lg shadow-lg shadow-neon-blue/10 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="bg-tech-dark p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <h3 className="text-neon-blue font-mono font-bold">
            SYSTEM_TERMINAL::MICHAEL_AI
          </h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-neon-blue/20 text-white border border-neon-blue/50"
                  : "bg-neon-purple/20 text-gray-200 border border-neon-purple/50"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] opacity-50 mt-1 block">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-neon-blue p-3 rounded-lg border border-gray-700 animate-pulse">
              Processing Query...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-tech-dark border-t border-gray-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter command or query..."
          className="flex-1 bg-black/50 border border-gray-600 text-white p-2 rounded focus:outline-none focus:border-neon-blue font-mono"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-neon-blue/20 hover:bg-neon-blue/40 text-neon-blue border border-neon-blue px-4 py-2 rounded font-bold transition-all"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
