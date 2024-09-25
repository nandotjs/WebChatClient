import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { initializeSocket } from '../utils/socketManager';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      if (response.status === 200 && response.data) {
        console.log('Login bem-sucedido');
        setIsAuthenticated(true);
        setUser({
          _id: response.data._id,
          username: response.data.username,
          email: response.data.email,
        });
        
        localStorage.setItem('token', response.data.token);
        
        initializeSocket(response.data.token);
        
        // Redirecionar para a página de chat
        router.push('/chat');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Erro ao fazer login. Tente novamente.');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Senha</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Entrar
      </button>
      <p className="text-center">
        Não tem uma conta?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-blue-500 hover:underline">
          Cadastre-se
        </button>
      </p>
    </form>
  );
};

export default Login;