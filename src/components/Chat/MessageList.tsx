import React, { useRef, useEffect } from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Message {
  _id: string;
  sender: string | { _id: string; username: string };
  text: string;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: User | null;
}

function MessageList({ messages, currentUser }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const isCurrentUserMessage = (message: Message) => {
    if (!currentUser) return false;
    if (typeof message.sender === 'string') {
      return message.sender === currentUser._id;
    }
    return message.sender._id === currentUser._id;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => {
        const isCurrentUser = isCurrentUserMessage(message);
        console.log(`Mensagem do usuário logado: ${isCurrentUser ? 'sim' : 'não'}`);
        return (
          <div
            key={message._id}
            className={`mb-4 ${
              isCurrentUser ? 'flex justify-end' : 'flex justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isCurrentUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p className="font-bold">
                {typeof message.sender === 'string'
                  ? message.sender
                  : message.sender.username}
              </p>
              <p>{message.text}</p>
              <p className="text-xs opacity-75">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;