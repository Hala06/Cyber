'use client';

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Code, 
  Lock, 
  Globe, 
  Database, 
  Eye,
  Play,
  Star,
  Trophy,
  Target,
  Zap,
  BookOpen,
  CheckCircle
} from 'lucide-react';

const challenges = [
  { 
    id: 1, 
    title: 'SQL Injection Basics', 
    category: 'Web', 
    difficulty: 'Easy', 
    points: 100, 
    description: 'Find and exploit a simple SQL injection vulnerability',
    icon: Database,
    level: 1
  },
  { 
    id: 2, 
    title: 'XSS Filter Bypass', 
    category: 'Web', 
    difficulty: 'Medium', 
    points: 200, 
    description: 'Bypass XSS protection mechanisms',
    icon: Code,
    level: 1
  },
  { 
    id: 3, 
    title: 'Buffer Overflow 101', 
    category: 'Pwn', 
    difficulty: 'Hard', 
    points: 300, 
    description: 'Exploit a basic stack buffer overflow',
    icon: Shield,
    level: 2
  },
  { 
    id: 4, 
    title: 'RSA Challenge', 
    category: 'Crypto', 
    difficulty: 'Medium', 
    points: 250, 
    description: 'Break a weak RSA implementation',
    icon: Lock,
    level: 2
  },
  { 
    id: 5, 
    title: 'Forensics Mystery', 
    category: 'Forensics', 
    difficulty: 'Easy', 
    points: 150, 
    description: 'Analyze network traffic to find hidden data',
    icon: Eye,
    level: 1
  },
  { 
    id: 6, 
    title: 'API Exploitation', 
    category: 'Web', 
    difficulty: 'Hard', 
    points: 400, 
    description: 'Find and exploit REST API vulnerabilities',
    icon: Globe,
    level: 3
  },
];

function ChallengeCard({ challenge }: { challenge: typeof challenges[0] }) {
  const { state, solveChallenge } = useGame();
  const isUnlocked = state.level >= challenge.level;
  const isSolved = state.completedChallenges.includes(challenge.id);

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/10 text-red-400 border-red-500/20'
  };

  const categoryColors = {
    Web: 'bg-indigo-500/20 text-indigo-300',
    Pwn: 'bg-red-500/20 text-red-300',
    Crypto: 'bg-purple-500/20 text-purple-300',
    Forensics: 'bg-emerald-500/20 text-emerald-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={`h-full p-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 
        ${isUnlocked 
          ? 'bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-700/50 hover:to-slate-800/50 hover:border-indigo-500/30' 
          : 'bg-slate-900/20 border-slate-700/30'
        } 
        ${isSolved ? 'ring-2 ring-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-slate-900/40' : ''}
      `}>
        <div className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${
                isUnlocked ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700/30 text-slate-500'
              }`}>
                <challenge.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${
                  isUnlocked ? 'text-slate-100' : 'text-slate-500'
                }`}>
                  {challenge.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs border ${categoryColors[challenge.category as keyof typeof categoryColors]}`}>
                    {challenge.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs border ${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{challenge.points}</span>
              </div>
              {isSolved && (
                <Trophy className="w-4 h-4 text-emerald-400" />
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-0">
          <p className={`text-sm leading-relaxed mb-4 ${
            isUnlocked ? 'text-slate-300' : 'text-slate-500'
          }`}>
            {challenge.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" />
              Level {challenge.level} required
            </div>
            
            <button
              onClick={() => isUnlocked && !isSolved && solveChallenge(challenge.id, challenge.points)}
              disabled={!isUnlocked || isSolved}
              className={`px-3 py-1 rounded text-sm transition-all duration-300 flex items-center gap-1 ${
                isSolved 
                  ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                  : isUnlocked
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isSolved ? (
                <>
                  <Trophy className="w-3 h-3" />
                  Solved
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  {isUnlocked ? 'Start' : 'Locked'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsCard({ title, value, subtitle, icon: Icon, gradient }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`backdrop-blur-sm border border-white/10 bg-gradient-to-br ${gradient} hover:shadow-lg transition-all duration-300 p-6 rounded-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-300 mb-1">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-3 rounded-full bg-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { state } = useGame();
  const solvedCount = state.completedChallenges.length;
  const totalChallenges = challenges.length;
  const progressPercentage = (solvedCount / totalChallenges) * 100;

  const unlockedChallenges = challenges.filter(c => state.level >= c.level);
  const currentLevelProgress = ((state.score % 100) / 100) * 100;

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Welcome back, {state.user?.username}!
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Continue your cybersecurity journey. Solve challenges, earn points, and level up your skills.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Score"
          value={state.score.toLocaleString()}
          subtitle={`${state.score} points earned`}
          icon={Star}
          gradient="from-amber-600/20 to-orange-600/20"
        />
        <StatsCard
          title="Current Level"
          value={state.level}
          subtitle={`${Math.floor(currentLevelProgress)}% to level ${state.level + 1}`}
          icon={Zap}
          gradient="from-indigo-600/20 to-purple-600/20"
        />
        <StatsCard
          title="Challenges Solved"
          value={`${solvedCount}/${totalChallenges}`}
          subtitle={`${Math.floor(progressPercentage)}% complete`}
          icon={Trophy}
          gradient="from-emerald-600/20 to-teal-600/20"
        />
        <StatsCard
          title="Available"
          value={unlockedChallenges.length}
          subtitle="Unlocked challenges"
          icon={BookOpen}
          gradient="from-pink-600/20 to-rose-600/20"
        />
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-3"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-200">Overall Progress</h3>
          <span className="text-sm text-slate-400">{Math.floor(progressPercentage)}% Complete</span>
        </div>
        <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Challenges Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-100">Available Challenges</h2>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full text-sm">
            {unlockedChallenges.length} unlocked
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
