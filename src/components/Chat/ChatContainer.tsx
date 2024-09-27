import React, { useState, useEffect, useCallback } from 'react';
import { getSocket } from '../../utils/socketManager';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useAuthStore } from '../../store/authStore';

interface Message {
  _id: string;
  sender: string | { _id: string; username: string };
  text: string;
  createdAt: string;
}

const isDev = process.env.NODE_ENV === 'development';

function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = getSocket();
  const currentUser = useAuthStore((state) => state.user);

  const handleNewMessage = useCallback((message: Message) => {
    if (isDev) console.log('Received new message:', message);
    setMessages(prevMessages => {
      // Verifica se a mensagem já existe (para evitar duplicatas)
      const messageExists = prevMessages.some(m => m._id === message._id);
      if (!messageExists) {
        return [...prevMessages, message];
      }
      return prevMessages;
    });
  }, []);

  const handlePreviousMessages = useCallback((previousMessages: Message[]) => {
    if (isDev) console.log('Received previous messages:', previousMessages.length);
    setMessages(previousMessages);
  }, []);

  useEffect(() => {
    if (socket) {
      if (isDev) console.log('Socket connected:', socket.connected);
      socket.on('newMessage', handleNewMessage);
      socket.on('loadPreviousMessages', handlePreviousMessages);
      socket.on('error', (error: string) => {
        console.error('Socket error:', error);
      });

      socket.emit('requestPreviousMessages');
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
        socket.off('loadPreviousMessages');
        socket.off('error');
      }
    };
  }, [socket, handleNewMessage, handlePreviousMessages]);

  const sendMessage = useCallback((text: string) => {
    if (socket && currentUser) {
      if (isDev) console.log('Sending message:', text);
      socket.emit('sendMessage', text);
      // Request previous messages again to ensure the latest messages are loaded
      socket.emit('requestPreviousMessages');
    } else {
      console.error('Socket not connected or user not authenticated');
    }
  }, [socket, currentUser]);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <MessageList messages={messages} currentUser={currentUser} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default React.memo(ChatContainer);