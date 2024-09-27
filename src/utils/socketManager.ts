import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  socket = io('http://localhost:3000', {
    auth: { token: `Bearer ${token}` }
  });

  socket.on('connect', () => {
    console.log('Conexão com Socket.IO bem sucedida');
  });

  socket.on('userLoggedIn', (data) => {
    console.log('Login bem-sucedido para o usuário:', data.userId);
  });

  // Adicione novos eventos aqui conforme necessário

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};