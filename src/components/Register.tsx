import React, { useState } from 'react';
import axios from 'axios';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações simplificadas
    if (!name.trim()) {
      setError('Nome não pode ser vazio.');
      return;
    }
    if (!email.includes('@')) {
      setError('Email deve conter @.');
      return;
    }
    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username:name,
        email,
        password
      });

      if (response.status === 201) {
        console.log('Usuário registrado com sucesso');
        onSwitchToLogin();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Erro ao cadastrar. Tente novamente.');
      } else {
        setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label htmlFor="name" className="block mb-1">Nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
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
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
        Cadastrar
      </button>
      <p className="text-center">
        Já tem uma conta?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-blue-500 hover:underline">
          Faça login
        </button>
      </p>
    </form>
  );
};

export default Register;