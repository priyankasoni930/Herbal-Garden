// components/Chatbot.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in .env.local");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Please provide a structured response to the following question about AYUSH (Ayurveda, Yoga and Naturopathy, Unani, Siddha and Homeopathy):

${input}

response should be 4 lines or less

Please ensure the information is accurate and relevant to AYUSH practices.

please ensure to not use * or # or any kind of symbols`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const botMessage = { role: "bot", content: response.text() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage = {
        role: "bot",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;

        const newMessage = {
          role: "user",
          content: "Uploaded an image",
          image: base64Image,
        };
        setMessages((prev) => [...prev, newMessage]);

        const prompt = [
          {
            text: "Please provide a structured response about this plant and its use . If youre not certain about the plants identity, please state this clearly. Ensure all information is factual and based on reliable sources within AYUSH systems. just a provide a 4 line respoinse without using any symobols * or # please",
          },
          {
            inlineData: {
              data: base64Image.split(",")[1],
              mimeType: file.type,
            },
          },
        ];

        const result = await model.generateContent(prompt);
        const response = result.response;
        const botMessage = { role: "bot", content: response.text() };
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error processing image:", error);
      const errorMessage = {
        role: "bot",
        content:
          "Sorry, I encountered an error processing the image. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              {message.image ? (
                <img
                  src={message.image}
                  alt="Uploaded plant"
                  className="max-w-full rounded-lg mb-2"
                />
              ) : null}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center bg-gray-800 rounded-lg">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow px-4 py-2 bg-transparent text-gray-100 focus:outline-none"
            placeholder="Ask about AYUSH plants..."
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 text-gray-400 hover:text-gray-200"
          >
            <Camera size={24} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-800"
          >
            Send
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
