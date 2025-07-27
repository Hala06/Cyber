'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { 
  ArrowLeft, 
  Send, 
  Lightbulb, 
  Target, 
  CheckCircle2,
  AlertCircle,
  Terminal
} from 'lucide-react';

interface LevelInterfaceProps {
  level: number;
  title: string;
  description: string;
  hint: string;
  onBack: () => void;
}

export default function LevelInterface({ level, title, description, hint, onBack }: LevelInterfaceProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { gameState, updateScore, completeLevel } = useGame();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput(prev => [...prev, `> ${input}`]);

    // Simulate API call - you'll replace this with real API calls
    setTimeout(() => {
      // Mock response based on level
      const responses = {
        1: "Welcome, agent. To proceed, send a POST request with the SHA256 hash of 'puzzlebox'.",
        2: "Decode this Base64: cHV6emxlYm94X2NoYWxsZW5nZQ==",
        3: "Parse this JSON and find the hidden key: {\"data\":{\"encrypted\":\"secret123\",\"level\":3}}",
      };

      const response = responses[level as keyof typeof responses] || "Invalid command. Try again.";
      setOutput(prev => [...prev, response]);

      // Mock success for demonstration
      if (input.toLowerCase().includes('puzzlebox') && level === 1) {
        updateScore(100);
        completeLevel(level);
        setOutput(prev => [...prev, "🎉 LEVEL COMPLETED! +100 points"]);
      }

      setIsLoading(false);
      setInput('');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={onBack}
            className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          <div className="text-center">
            <h1 className="text-3xl font-bold glow-text mb-2">Level {level}</h1>
            <h2 className="text-xl text-gray-300">{title}</h2>
          </div>

          <div className="flex items-center space-x-2 bg-background/50 px-3 py-1 rounded-lg border border-accent/30">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-accent font-mono">{gameState.score} pts</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Challenge Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Objective */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-accent/20">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-accent" />
                <span>Objective</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Hint */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-warning/20">
              <motion.button
                onClick={() => setShowHint(!showHint)}
                className="w-full flex items-center justify-between text-left"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  <span className="text-xl font-bold text-warning">Hint</span>
                </div>
                <motion.div
                  animate={{ rotate: showHint ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.div>
              </motion.button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: showHint ? 'auto' : 0, 
                  opacity: showHint ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 mt-4 leading-relaxed">{hint}</p>
              </motion.div>
            </div>

            {/* Progress */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-success/20">
              <div className="flex items-center space-x-2 mb-3">
                {gameState.completedLevels.includes(level) ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-warning" />
                )}
                <span className="text-xl font-bold">
                  {gameState.completedLevels.includes(level) ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Completion rewards: <span className="text-success font-bold">+100 points</span>
              </p>
            </div>
          </motion.div>

          {/* Terminal Interface */}
          <motion.div
            className="bg-terminal/90 backdrop-blur-sm rounded-xl border border-glow/20 shadow-glow-green"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Terminal Header */}
            <div className="bg-glow/10 px-4 py-3 border-b border-glow/20 flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-glow" />
              <span className="text-glow font-mono font-bold">CTF Terminal - Level {level}</span>
              <div className="flex-1"></div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-danger rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-96 flex flex-col">
              {/* Output */}
              <div className="flex-1 overflow-y-auto space-y-2 mb-4 font-mono text-sm">
                <div className="text-glow">
                  PuzzleBox CTF Terminal v1.0.0
                </div>
                <div className="text-glow">
                  Level {level} initialized. Type your commands below.
                </div>
                <div className="border-t border-glow/20 my-2"></div>
                
                {output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${line.startsWith('>') ? 'text-accent' : 'text-gray-300'}`}
                  >
                    {line}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    className="text-warning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Processing...
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-glow font-mono">
                    {'>'} 
                  </span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-background/50 border border-glow/30 rounded-lg focus:border-glow focus:outline-none font-mono text-glow placeholder-gray-500"
                    placeholder="Enter your command..."
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-glow/20 hover:bg-glow/30 disabled:bg-gray-600 disabled:cursor-not-allowed border border-glow/30 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-glow" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
