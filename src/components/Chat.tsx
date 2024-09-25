import React, { useEffect, useState } from 'react';
import { getSocket } from '../utils/socketManager';

const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      setIsConnected(true);
      
      // Listener para desconexão
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
    }

    return () => {
      if (socket) {
        socket.off('disconnect');
      }
    };
  }, []);

  if (!isConnected) {
    return <div>Conectando ao chat...</div>;
  }

  return (
    <div>
      <h1>Chat</h1>
      <p>Bem-vindo ao chat! A conexão foi estabelecida com sucesso.</p>
    </div>
  );
};

export default Chat;