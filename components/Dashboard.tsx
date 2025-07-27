'use client';

import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  Cpu,
  Terminal,
  Activity
} from 'lucide-react';

const challenges = [
  { 
    id: 1, 
    title: 'Neural SQL Injection', 
    category: 'Web', 
    difficulty: 'Easy', 
    points: 100, 
    description: 'Infiltrate the database through quantum SQL vulnerabilities',
    icon: Database,
    level: 1
  },
  { 
    id: 2, 
    title: 'XSS Quantum Bypass', 
    category: 'Web', 
    difficulty: 'Medium', 
    points: 200, 
    description: 'Breach dimensional XSS protection protocols',
    icon: Code,
    level: 1
  },
  { 
    id: 3, 
    title: 'Binary Neural Override', 
    category: 'Pwn', 
    difficulty: 'Hard', 
    points: 300, 
    description: 'Exploit cybernetic memory buffer systems',
    icon: Cpu,
    level: 2
  },
  { 
    id: 4, 
    title: 'Quantum Cryptography Break', 
    category: 'Crypto', 
    difficulty: 'Medium', 
    points: 250, 
    description: 'Decrypt inter-dimensional communication channels',
    icon: Lock,
    level: 2
  },
  { 
    id: 5, 
    title: 'Digital Forensics Matrix', 
    category: 'Forensics', 
    difficulty: 'Easy', 
    points: 150, 
    description: 'Trace data fragments through the cyber-matrix',
    icon: Eye,
    level: 1
  },
  { 
    id: 6, 
    title: 'API Neural Network Hack', 
    category: 'Web', 
    difficulty: 'Hard', 
    points: 400, 
    description: 'Infiltrate AI-powered REST API defenses',
    icon: Globe,
    level: 3
  },
];

function CyberCard({ children, className = "", glowColor }: { 
  children: React.ReactNode; 
  className?: string; 
  glowColor?: string;
}) {
  const { colors } = useTheme();
  
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: glowColor ? `0 0 30px ${glowColor}40` : `0 0 30px ${colors.glow}40`
      }}
      transition={{ duration: 0.3 }}
      style={{
        background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
        border: `1px solid ${colors.border}`,
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    >
      {/* Cyber grid background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary}40 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary}40 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px'
        }}
      />
      
      {/* Glowing border effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20, transparent)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          padding: '1px'
        }}
      />
      
      {children}
    </motion.div>
  );
}

function ChallengeCard({ challenge }: { challenge: typeof challenges[0] }) {
  const { gameState } = useGame();
  const { colors } = useTheme();
  const router = useRouter();
  const isUnlocked = gameState.currentLevel >= challenge.level;
  const isSolved = gameState.completedLevels.includes(challenge.id);

  const difficultyColors = {
    Easy: colors.success,
    Medium: colors.warning, 
    Hard: colors.error
  };

  const categoryColors = {
    Web: colors.primary,
    Pwn: colors.error,
    Crypto: colors.secondary,
    Forensics: colors.success
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group"
      style={{ perspective: '1000px' }}
    >
      <CyberCard 
        className="h-full p-6 transition-all duration-500"
        glowColor={isUnlocked ? colors.primary : colors.textSecondary}
      >
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl"
                style={{
                  background: isUnlocked 
                    ? `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`
                    : `${colors.textSecondary}20`,
                  border: `1px solid ${isUnlocked ? colors.border : colors.textSecondary}40`,
                  color: isUnlocked ? colors.primary : colors.textSecondary
                }}
              >
                <challenge.icon className="w-6 h-6" />
              </motion.div>
              
              <div>
                <h3 
                  className="text-lg font-bold mb-2"
                  style={{ 
                    color: isUnlocked ? colors.text : colors.textSecondary,
                    textShadow: isUnlocked ? `0 0 10px ${colors.glow}50` : 'none'
                  }}
                >
                  {challenge.title}
                </h3>
                <div className="flex gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      background: `${categoryColors[challenge.category as keyof typeof categoryColors]}20`,
                      borderColor: `${categoryColors[challenge.category as keyof typeof categoryColors]}40`,
                      color: categoryColors[challenge.category as keyof typeof categoryColors]
                    }}
                  >
                    {challenge.category}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      background: `${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}20`,
                      borderColor: `${difficultyColors[challenge.difficulty as keyof typeof difficultyColors]}40`,
                      color: difficultyColors[challenge.difficulty as keyof typeof difficultyColors]
                    }}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 mb-2"
                style={{ color: colors.warning }}
              >
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">{challenge.points}</span>
              </motion.div>
              {isSolved && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <Trophy className="w-5 h-5" style={{ color: colors.success }} />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p 
            className="text-sm leading-relaxed mb-6"
            style={{ color: isUnlocked ? colors.textSecondary : `${colors.textSecondary}60` }}
          >
            {challenge.description}
          </p>
          
          {/* Bottom section */}
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 text-xs"
              style={{ color: colors.textSecondary }}
            >
              <Target className="w-3 h-3" />
              Neural Level {challenge.level}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlocked || isSolved}
              onClick={() => {
                if (isUnlocked && !isSolved) {
                  router.push(`/challenges/${challenge.id}`);
                }
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
              style={{
                background: isSolved 
                  ? `linear-gradient(135deg, ${colors.success}, ${colors.success}80)`
                  : isUnlocked
                    ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                    : `${colors.textSecondary}20`,
                color: isSolved || isUnlocked ? '#ffffff' : colors.textSecondary,
                border: `1px solid ${isSolved ? colors.success : isUnlocked ? colors.border : colors.textSecondary}40`,
                boxShadow: isUnlocked && !isSolved ? `0 0 20px ${colors.glow}30` : 'none'
              }}
            >
              {isSolved ? (
                <>
                  <Trophy className="w-4 h-4" />
                  Completed
                </>
              ) : isUnlocked ? (
                <>
                  <Play className="w-4 h-4" />
                  Initialize
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Locked
                </>
              )}
            </motion.button>
          </div>
        </div>
      </CyberCard>
    </motion.div>
  );
}

function StatsDisplay({ title, value, subtitle, icon: Icon, gradient }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  gradient: [string, string];
}) {
  const { colors } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <CyberCard className="p-6" glowColor={gradient[0]}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>
              {title}
            </p>
            <p 
              className="text-3xl font-bold mb-1"
              style={{ 
                color: colors.text,
                textShadow: `0 0 10px ${gradient[0]}50`
              }}
            >
              {value}
            </p>
            {subtitle && (
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {subtitle}
              </p>
            )}
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${gradient[0]}30, ${gradient[1]}30)`,
              border: `1px solid ${gradient[0]}40`
            }}
          >
            <Icon className="w-8 h-8" style={{ color: gradient[0] }} />
          </motion.div>
        </div>
        
        {/* Data stream effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-1 rounded-full mt-4"
          style={{
            background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
            boxShadow: `0 0 10px ${gradient[0]}60`
          }}
        />
      </CyberCard>
    </motion.div>
  );
}

export default function Dashboard() {
  const { gameState } = useGame();
  const { colors } = useTheme();
  
  const solvedCount = gameState.completedLevels.length;
  const totalChallenges = challenges.length;
  const progressPercentage = (solvedCount / totalChallenges) * 100;
  const unlockedChallenges = challenges.filter(c => gameState.currentLevel >= c.level);

  return (
    <div className="min-h-screen p-6 space-y-8 relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 mb-8"
        >
          <h1 
            className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`
            }}
          >
            Welcome to the CyberForge, {gameState.username}
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl max-w-3xl mx-auto"
            style={{ color: colors.textSecondary }}
          >
            Navigate through digital dimensions. Exploit quantum vulnerabilities. Ascend the neural hierarchy.
          </motion.p>
          
          {/* Neural activity indicator */}
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Activity className="w-4 h-4" style={{ color: colors.success }} />
            <span className="text-sm" style={{ color: colors.success }}>
              Neural Link: Active
            </span>
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.success }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsDisplay
            title="Neural Score"
            value={gameState.score.toLocaleString()}
            subtitle="Quantum points acquired"
            icon={Star}
            gradient={[colors.warning, colors.warning]}
          />
          <StatsDisplay
            title="Current Dimension"
            value={gameState.currentLevel}
            subtitle="Neural evolution level"
            icon={Zap}
            gradient={[colors.primary, colors.secondary]}
          />
          <StatsDisplay
            title="Missions Complete"
            value={`${solvedCount}/${totalChallenges}`}
            subtitle={`${Math.floor(progressPercentage)}% dimensional progress`}
            icon={Trophy}
            gradient={[colors.success, colors.accent]}
          />
          <StatsDisplay
            title="Available Sectors"
            value={unlockedChallenges.length}
            subtitle="Accessible neural pathways"
            icon={BookOpen}
            gradient={[colors.secondary, colors.primary]}
          />
        </div>

        {/* Progress Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <CyberCard className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                Dimensional Progress
              </h3>
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {Math.floor(progressPercentage)}% Neural Integration
              </span>
            </div>
            <div className="relative h-4 rounded-full overflow-hidden" style={{ background: `${colors.textSecondary}20` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                  boxShadow: `0 0 20px ${colors.glow}40`
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: [
                      `0 0 20px ${colors.glow}40`,
                      `0 0 30px ${colors.glow}60`,
                      `0 0 20px ${colors.glow}40`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </CyberCard>
        </motion.div>

        {/* Challenges Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 
              className="text-3xl font-bold"
              style={{ 
                color: colors.text,
                textShadow: `0 0 10px ${colors.glow}30`
              }}
            >
              Neural Challenges
            </h2>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full border"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                borderColor: colors.border,
                color: colors.primary
              }}
            >
              {unlockedChallenges.length} Sectors Unlocked
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
