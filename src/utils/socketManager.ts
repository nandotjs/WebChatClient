import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (token: string) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io('http://localhost:3000', {
    auth: { token: `Bearer ${token}` }
  });

  socket.on('connect', () => {
    console.log('Conexão com Socket.IO bem sucedida');
  });

  socket.on('userLoggedIn', (data) => {
    console.log('Login bem-sucedido para o usuário:', data.userId);
  });

  return socket;
};

export const getSocket = () => socket;