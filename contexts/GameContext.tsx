'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GameState {
  currentLevel: number;
  score: number;
  isAuthenticated: boolean;
  username: string;
  completedLevels: number[];
  hints: { [level: number]: string[] };
}

interface GameContextType {
  gameState: GameState;
  updateScore: (points: number) => void;
  completeLevel: (level: number) => void;
  login: (username: string) => void;
  logout: () => void;
  addHint: (level: number, hint: string) => void;
  canAccessLevel: (level: number) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    score: 0,
    isAuthenticated: false,
    username: '',
    completedLevels: [],
    hints: {},
  });

  const updateScore = (points: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points
    }));
  };

  const completeLevel = (level: number) => {
    setGameState(prev => ({
      ...prev,
      completedLevels: [...prev.completedLevels, level],
      currentLevel: Math.max(prev.currentLevel, level + 1)
    }));
  };

  const login = (username: string) => {
    setGameState(prev => ({
      ...prev,
      isAuthenticated: true,
      username
    }));
  };

  const logout = () => {
    setGameState(prev => ({
      ...prev,
      isAuthenticated: false,
      username: '',
      score: 0,
      currentLevel: 1,
      completedLevels: [],
      hints: {}
    }));
  };

  const addHint = (level: number, hint: string) => {
    setGameState(prev => ({
      ...prev,
      hints: {
        ...prev.hints,
        [level]: [...(prev.hints[level] || []), hint]
      }
    }));
  };

  const canAccessLevel = (level: number) => {
    if (level === 1) return true;
    
    // Need at least 100 points per level to unlock next
    const requiredScore = (level - 1) * 100;
    return gameState.score >= requiredScore;
  };

  return (
    <GameContext.Provider value={{
      gameState,
      updateScore,
      completeLevel,
      login,
      logout,
      addHint,
      canAccessLevel
    }}>
      {children}
    </GameContext.Provider>
  );
};
