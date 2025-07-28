"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame } from "@/contexts/GameContext";
import Navigation from "@/components/Navigation";
import CyberAnimations from "@/components/CyberAnimations";
import { 
  ArrowLeft,
  Code,
  Shield,
  Eye,
  Database,
  Lock,
  Trophy,
  Star,
  Play,
  Target,
  Zap
} from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  level: number;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  tags: string[];
}

export default function AllChallenges() {
  const router = useRouter();
  const { colors } = useTheme();
  const { gameState } = useGame();

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "SHA256 Hash Encryption",
      description: "Encrypt 'boot.dev' into a SHA256 hash",
      category: "SHA256 Hash",
      difficulty: "Easy",
      points: 100,
      level: 1,
      icon: Code,
      tags: ["Encryption", "SHA256 Hash"]
    },
    {
      id: 2,
      title: "Hex ASCII Decryption",
      description: "Hex color #7072496d454167456e hides a word when converted to ASCII. What is it?",
      category: "ASCII",
      difficulty: "Medium",
      points: 200,
      level: 1,
      icon: Shield,
      tags: ["ASCII", "Hexidecimal"]
    },
    {
      id: 3,
      title: "Morse API Call",
      description: "Translate the following Morse code: .... .- -.-. -.- .- - .... --- -.",
      category: "Morse",
      difficulty: "Medium",
      points: 200,
      level: 1,
      icon: Eye,
      tags: ["Decryption", "Morse"]
    },
  ];

  const categories = [...new Set(challenges.map(c => c.category))];

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      "Web Security": colors.primary,
      "Cryptography": colors.secondary,
      "Forensics": colors.success,
      "Binary Exploitation": colors.error
    };
    return categoryColors[category] || colors.primary;
  };

  const getDifficultyColor = (difficulty: string) => {
    const difficultyColors: Record<string, string> = {
      "Easy": colors.success,
      "Medium": colors.warning,
      "Hard": colors.error
    };
    return difficultyColors[difficulty] || colors.primary;
  };

  return (
    <>
      <Navigation />
      <CyberAnimations variant="particles" intensity="low">
        <div className="min-h-screen pt-20 p-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-32"
              style={{
                background: `linear-gradient(180deg, transparent, ${colors.primary}15, transparent)`,
                left: `${(i * 4) % 100}%`,
                top: `${(i * 6) % 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 8 + (i % 5),
                repeat: Infinity,
                delay: (i * 0.2) % 8,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push("/dashboard")}
              className="p-3 rounded-xl transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                border: `1px solid ${colors.border}`,
                color: colors.text
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            
            <div>
              <h1 
                className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Neural Challenges
              </h1>
              <p style={{ color: colors.textSecondary }}>
                {challenges.length} challenges across {categories.length} domains
              </p>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Total Challenges", value: challenges.length, icon: Target },
              { label: "Completed", value: gameState.completedLevels.length, icon: Trophy },
              { label: "Your Score", value: gameState.score, icon: Star },
              { label: "Available", value: challenges.filter(c => gameState.currentLevel >= c.level).length, icon: Zap }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="rounded-xl p-4 text-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}60, ${colors.surface}40)`,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-2xl font-bold" style={{ color: colors.text }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Challenges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {challenges.map((challenge, index) => {
              const isUnlocked = gameState.currentLevel >= challenge.level;
              const isSolved = gameState.completedLevels.includes(challenge.id);

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={isUnlocked ? { scale: 1.05, y: -10 } : {}}
                  className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
                    isUnlocked ? "cursor-pointer" : "opacity-60"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                    border: isSolved 
                      ? `2px solid ${colors.success}` 
                      : `1px solid ${colors.border}`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: isUnlocked && !isSolved ? `0 0 20px ${colors.glow}20` : 'none'
                  }}
                  onClick={() => {
                    if (isUnlocked) {
                      router.push(`/challenges/${challenge.id}`);
                    }
                  }}
                >
                  {/* Cyber grid background */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `
                        linear-gradient(${colors.primary}40 1px, transparent 1px),
                        linear-gradient(90deg, ${colors.primary}40 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div 
                        className="p-3 rounded-xl"
                        style={{
                          background: `${getCategoryColor(challenge.category)}20`,
                          border: `1px solid ${getCategoryColor(challenge.category)}40`
                        }}
                      >
                        <challenge.icon 
                          className="w-6 h-6" 
                          style={{ color: getCategoryColor(challenge.category) }} 
                        />
                      </div>
                      
                      {isSolved && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2 rounded-full"
                          style={{ background: `${colors.success}20` }}
                        >
                          <Trophy className="w-4 h-4" style={{ color: colors.success }} />
                        </motion.div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-2" style={{ color: colors.text }}>
                      {challenge.title}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {challenge.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {challenge.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            background: `${colors.primary}10`,
                            color: colors.primary,
                            border: `1px solid ${colors.primary}20`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${getDifficultyColor(challenge.difficulty)}20`,
                            color: getDifficultyColor(challenge.difficulty),
                            border: `1px solid ${getDifficultyColor(challenge.difficulty)}40`
                          }}
                        >
                          {challenge.difficulty}
                        </span>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${colors.success}20`,
                            color: colors.success,
                            border: `1px solid ${colors.success}40`
                          }}
                        >
                          {challenge.points} pts
                        </span>
                      </div>

                      <motion.button
                        whileHover={isUnlocked ? { scale: 1.1 } : {}}
                        whileTap={isUnlocked ? { scale: 0.9 } : {}}
                        disabled={!isUnlocked}
                        className="p-2 rounded-lg transition-all duration-300"
                        style={{
                          background: isSolved 
                            ? `${colors.success}20`
                            : isUnlocked
                              ? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
                              : `${colors.textSecondary}20`,
                          border: `1px solid ${
                            isSolved ? colors.success + '40' 
                            : isUnlocked ? colors.border 
                            : colors.textSecondary + '40'
                          }`,
                          color: isSolved 
                            ? colors.success 
                            : isUnlocked 
                              ? colors.text 
                              : colors.textSecondary
                        }}
                      >
                        {isSolved ? (
                          <Trophy className="w-4 h-4" />
                        ) : isUnlocked ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      </CyberAnimations>
    </>
  );
}
