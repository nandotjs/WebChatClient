import React, { useRef, useEffect } from 'react';

interface Message {
  _id: string;
  sender: string | { _id: string; username: string }; // Ajuste aqui
  text: string;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
}

function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div key={message._id} className="mb-4">
          <p className="font-bold">
            {typeof message.sender === 'string' 
              ? message.sender 
              : message.sender.username}
          </p>
          <p>{message.text}</p>
          <p className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;