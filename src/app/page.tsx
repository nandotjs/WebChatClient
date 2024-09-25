'use client';

import React from 'react';
import { useAuthStore } from '../store/authStore';
import AuthPage from '../components/AuthPage';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, router]);

  return <AuthPage />;
};

export default Home;
