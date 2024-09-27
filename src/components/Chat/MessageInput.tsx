import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Digite sua mensagem..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default MessageInput;