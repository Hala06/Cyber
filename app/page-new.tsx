'use client';

import { useGame } from '@/contexts/GameContext';
import Background3D from '@/components/Background3D';
import Navigation from '@/components/Navigation';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const { gameState } = useGame();

  if (!gameState.isAuthenticated) {
    return (
      <>
        <Background3D />
        <LoginScreen />
      </>
    );
  }

  return (
    <>
      <Background3D />
      <Navigation />
      <Dashboard />
    </>
  );
}
