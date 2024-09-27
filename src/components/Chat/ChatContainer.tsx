import React, { useState, useEffect, useCallback } from 'react';
import { getSocket } from '../../utils/socketManager';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

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

  const handleNewMessage = useCallback((message: Message) => {
    if (isDev) console.log('Received new message:', message);
    setMessages(prevMessages => [...prevMessages, message]);
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
    if (socket) {
      if (isDev) console.log('Sending message:', text);
      socket.emit('sendMessage', text);
    } else {
      console.error('Socket not connected');
    }
  }, [socket]);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
}

export default React.memo(ChatContainer);