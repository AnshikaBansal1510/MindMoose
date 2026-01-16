import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  ArrowLeft,
  Send,
  Shield,
  Clock,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axiosInstance from "../../config/axios.js"

export default function AiTherapist() {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Hello🤍! I'm your AI Therapist. This is a private and temporary conversation. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    },
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  /* Auto-scroll to bottom when messages update */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  /* Send message to backend */
  const sendMessage = async () => {

    if (!currentMessage.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      content: currentMessage,
      isUser: true,
      timestamp: new Date(),
      type: "text",
    };
  
    // Show user message instantly
    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    setError(null);
  
    try {
      // Convert frontend messages → LLM format
      const payload = {
        messages: [
          ...messages.map((m) => ({
            role: m.isUser ? "user" : "assistant",
            content: m.content,
          })),
          { role: "user", content: currentMessage },
        ],
      };
  
      // Call backend AI endpoint
      const res = await axiosInstance.post("/ai/chat", payload);
  
      // Append AI reply
      if(res.data.success){

        const reply = {
          id: Date.now() + 1,       // number
          content: res.data.reply,
          isUser: false,
          timestamp: new Date(),    // object
          type: "text",
        };
  
        setMessages((prev) => [...prev, reply]);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      // Graceful error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          content: "⚠️ Sorry, I'm having trouble responding right now.",
          isUser: false,
          timestamp: new Date(),
          type: "text",
        },
      ]);
      setError(err.message);
    } finally {
      setIsTyping(false);
    }
  };
  
  /* Reset chat session */
  const startNewSession = () => {
    setMessages([
      {
        id: 1,
        content:
          "Hello 🤍! I'm your AI Therapist. This is a private and temporary conversation. How are you feeling today?",
        isUser: false,
        timestamp: new Date(),
        type: "text",
      },
    ]);
    setCurrentMessage("");
    setIsTyping(false);
    setError(null);
  };
  
  /* Format timestamps */
  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-white to-emerald-50 font-['Inter'] text-gray-900">

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-sky-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shadow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#4a1c2f]">
              AI Therapist
            </h2>
            <p className="text-xs text-emerald-600 font-medium">
              Calm • Private • Supportive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 text-sky-600 hover:bg-sky-50 transition ">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={startNewSession}
            className="p-2 rounded-lg group hover:bg-gray-100">
            <RefreshCw className="w-5 h-5 text-gray-600 group-hover:text-sky-600"/>
          </button>
        </div>
      </div>

      {/* Privacy Strip */}
      <div className="bg-gradient-to-r from-sky-100 to-emerald-100 text-sky-700 text-sm py-2 flex items-center justify-center gap-2">
        <Shield className="w-4 h-4" />
        Private conversation
        <Clock className="w-4 h-4 ml-2" />
        Not stored
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-xl">
              {!m.isUser && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">AI</span>
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  m.isUser
                    ? "bg-gradient-to-r from-sky-500 to-emerald-500 text-white shadow-lg"
                    : "bg-white text-gray-900 shadow-sm border border-gray-100"
                }`}
              >
                <div className="prose prose-sm max-w-none text-sm leading-relaxed">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
                <p
                  className={`text-xs mt-2 ${
                    m.isUser ? "text-sky-100" : "text-gray-400"
                  }`}
                >
                  {formatTime(m.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xl">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  AI is typing...
                </span>
              </div>
              <div className="px-4 py-3 rounded-2xl flex space-x-1 bg-white border border-gray-100">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75" />
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white border-gray-100">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Speak or type your message..."
            className="w-full px-4 py-3 rounded-xl focus:outline-none bg-white border border-gray-300 text-gray-900 focus:ring-2 focus:ring-sky-500"
            disabled={isTyping}
          />

          <button
            onClick={sendMessage}
            disabled={!currentMessage.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl hover:from-sky-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mt-2">⚠️ {error}</p>
        )}
      </div>
    </div>
  );
}
