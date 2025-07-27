'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Trophy, 
  Target, 
  Shield,
  Code,
  Binary,
  Search,
  Globe,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  challenges: ChallengeType[];
  completed: number;
  total: number;
}

interface ChallengeType {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  isCompleted: boolean;
  isLocked: boolean;
}

function CategoryCard({ title, description, icon, color, challenges, completed, total }: CategoryCardProps) {
  const progress = (completed / total) * 100;
  
  return (
    <motion.div
      className="bg-card/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-accent/50 transition-all group"
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{completed}/{total} challenges</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Progress</div>
          <div className="text-lg font-bold text-accent">{Math.round(progress)}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
        <motion.div
          className={`h-2 rounded-full ${color.replace('bg-', 'bg-')}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4">{description}</p>

      {/* Challenge List */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {challenges.slice(0, 3).map((challenge) => (
          <motion.div
            key={challenge.id}
            className={`
              flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
              ${challenge.isCompleted 
                ? 'bg-success/10 border-success/30 text-success' 
                : challenge.isLocked 
                ? 'bg-gray-800/50 border-gray-600/30 text-gray-500 cursor-not-allowed' 
                : 'bg-background/50 border-gray-600/50 text-gray-300 hover:border-accent/50'
              }
            `}
            whileHover={!challenge.isLocked ? { scale: 1.02 } : {}}
          >
            <div className="flex items-center space-x-3">
              {challenge.isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : challenge.isLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <div>
                <div className="font-medium text-sm">{challenge.title}</div>
                <div className="text-xs opacity-70">{challenge.difficulty}</div>
              </div>
            </div>
            <div className="text-sm font-mono">{challenge.points}pts</div>
          </motion.div>
        ))}
        {challenges.length > 3 && (
          <div className="text-center py-2">
            <span className="text-xs text-gray-500">+{challenges.length - 3} more challenges</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <motion.button
        className="w-full mt-4 bg-accent/20 hover:bg-accent/30 border border-accent/30 rounded-lg py-2 px-4 text-accent font-medium transition-all flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>View Challenges</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

function QuickAccessCard({ title, subtitle, icon, color, onClick }: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`${color} rounded-xl p-4 cursor-pointer group`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-bold text-white">{title}</div>
          <div className="text-xs text-white/70">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { gameState, canAccessLevel } = useGame();

  // Mock data for categories
  const categories = [
    {
      title: "Web Exploitation",
      description: "Web penetration, cryptography, binary analysis, and network engineering challenges.",
      icon: <Globe className="w-6 h-6 text-white" />,
      color: "bg-blue-600",
      challenges: [
        { id: 1, title: "Welcome Challenge", difficulty: "Easy" as const, points: 100, isCompleted: gameState.completedLevels.includes(1), isLocked: !canAccessLevel(1) },
        { id: 2, title: "XSS Reflection", difficulty: "Easy" as const, points: 150, isCompleted: gameState.completedLevels.includes(2), isLocked: !canAccessLevel(2) },
        { id: 3, title: "CSRF Token Bypass", difficulty: "Medium" as const, points: 200, isCompleted: false, isLocked: true },
        { id: 4, title: "Advanced SQLi", difficulty: "Hard" as const, points: 300, isCompleted: false, isLocked: true },
      ]
    },
    {
      title: "Cryptography",
      description: "Practice skills challenges based on actual cybersecurity vulnerabilities.",
      icon: <Shield className="w-6 h-6 text-white" />,
      color: "bg-purple-600",
      challenges: [
        { id: 5, title: "Caesar Cipher", difficulty: "Easy" as const, points: 100, isCompleted: false, isLocked: !canAccessLevel(1) },
        { id: 6, title: "RSA Basics", difficulty: "Medium" as const, points: 200, isCompleted: false, isLocked: true },
        { id: 7, title: "Hash Collision", difficulty: "Hard" as const, points: 300, isCompleted: false, isLocked: true },
        { id: 8, title: "Elliptic Curves", difficulty: "Expert" as const, points: 500, isCompleted: false, isLocked: true },
      ]
    },
    {
      title: "Binary Exploitation",
      description: "Unlock new challenges as you earn points and advance through difficulty levels.",
      icon: <Binary className="w-6 h-6 text-white" />,
      color: "bg-red-600",
      challenges: [
        { id: 9, title: "Buffer Overflow", difficulty: "Medium" as const, points: 250, isCompleted: false, isLocked: true },
        { id: 10, title: "Format String", difficulty: "Hard" as const, points: 350, isCompleted: false, isLocked: true },
        { id: 11, title: "Kernel Exploit", difficulty: "Expert" as const, points: 500, isCompleted: false, isLocked: true },
      ]
    },
    {
      title: "Reverse Engineering",
      description: "Use command-line tools and scripts to solve complex security puzzles.",
      icon: <Search className="w-6 h-6 text-white" />,
      color: "bg-green-600",
      challenges: [
        { id: 12, title: "Simple Crackme", difficulty: "Easy" as const, points: 150, isCompleted: false, isLocked: true },
        { id: 13, title: "Android APK", difficulty: "Medium" as const, points: 250, isCompleted: false, isLocked: true },
        { id: 14, title: "VM Analysis", difficulty: "Hard" as const, points: 400, isCompleted: false, isLocked: true },
      ]
    }
  ];

  const totalChallenges = categories.reduce((sum, cat) => sum + cat.challenges.length, 0);
  const completedChallenges = categories.reduce((sum, cat) => 
    sum + cat.challenges.filter(c => c.isCompleted).length, 0
  );

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Welcome to PuzzleBox
          </motion.h1>
          <p className="text-xl text-gray-300 mb-2">
            Master cybersecurity through hands-on challenges. Start your journey from zero points
          </p>
          <p className="text-lg text-gray-400">
            and unlock progressively difficult puzzles as you build your skills.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{gameState.score}</div>
            <div className="text-gray-400">Total Points</div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">{completedChallenges}</div>
            <div className="text-gray-400">Challenges Solved</div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-warning mb-2">{gameState.currentLevel}</div>
            <div className="text-gray-400">Current Level</div>
          </div>
          <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-glow mb-2">{Math.round((completedChallenges / totalChallenges) * 100)}%</div>
            <div className="text-gray-400">Overall Progress</div>
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickAccessCard
              title="Browse Challenges"
              subtitle="Start this first challenge"
              icon={<Trophy className="w-5 h-5 text-white" />}
              color="bg-gradient-to-r from-purple-600 to-blue-600"
              onClick={() => console.log("Browse challenges")}
            />
            <QuickAccessCard
              title="Open Terminal"
              subtitle="Access the command interface"
              icon={<Code className="w-5 h-5 text-white" />}
              color="bg-gradient-to-r from-green-600 to-teal-600"
              onClick={() => console.log("Open terminal")}
            />
          </div>
        </motion.div>

        {/* Challenge Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Challenge Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  color={category.color}
                  challenges={category.challenges}
                  completed={category.challenges.filter(c => c.isCompleted).length}
                  total={category.challenges.length}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ready to Begin Section */}
        <motion.div
          className="bg-gradient-to-r from-accent/20 to-glow/20 rounded-xl border border-accent/30 p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Ready to Begin?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You&apos;ll start with 0 points and unlock new challenges as you progress. Each category requires a 
            minimum number of points to access higher difficulty levels.
          </p>
          <motion.button
            className="bg-accent hover:bg-accent/80 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("Start journey")}
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
