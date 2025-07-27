"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Trophy, 
  Medal, 
  Crown, 
  ArrowLeft,
  Zap,
  Target,
  Users,
  Activity
} from "lucide-react";

interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  challengesSolved: number;
  rank: number;
  avatar: string;
  isOnline: boolean;
}

export default function Leaderboard() {
  const router = useRouter();
  const { colors } = useTheme();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock leaderboard data
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: 1,
        username: "CyberNinja",
        score: 2850,
        challengesSolved: 12,
        rank: 1,
        avatar: "🥷",
        isOnline: true
      },
      {
        id: 2,
        username: "QuantumHacker",
        score: 2750,
        challengesSolved: 11,
        rank: 2,
        avatar: "⚡",
        isOnline: true
      },
      {
        id: 3,
        username: "NeuralGhost",
        score: 2650,
        challengesSolved: 10,
        rank: 3,
        avatar: "👻",
        isOnline: false
      },
      {
        id: 4,
        username: "CodeBreaker",
        score: 2400,
        challengesSolved: 9,
        rank: 4,
        avatar: "🔥",
        isOnline: true
      },
      {
        id: 5,
        username: "CryptoLord",
        score: 2200,
        challengesSolved: 8,
        rank: 5,
        avatar: "💎",
        isOnline: false
      },
      {
        id: 6,
        username: "BinaryMaster",
        score: 2000,
        challengesSolved: 7,
        rank: 6,
        avatar: "🤖",
        isOnline: true
      },
      {
        id: 7,
        username: "DigitalPhantom",
        score: 1850,
        challengesSolved: 6,
        rank: 7,
        avatar: "💀",
        isOnline: false
      },
      {
        id: 8,
        username: "SystemBreacher",
        score: 1700,
        challengesSolved: 6,
        rank: 8,
        avatar: "🛡️",
        isOnline: true
      }
    ];

    // Simulate loading
    const timer = setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6" style={{ color: '#FFD700' }} />;
      case 2:
        return <Medal className="w-6 h-6" style={{ color: '#C0C0C0' }} />;
      case 3:
        return <Medal className="w-6 h-6" style={{ color: '#CD7F32' }} />;
      default:
        return <Trophy className="w-5 h-5" style={{ color: colors.textSecondary }} />;
    }
  };

  const getRankGlow = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700';
      case 2:
        return '#C0C0C0';
      case 3:
        return '#CD7F32';
      default:
        return colors.primary;
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated cyber background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-40"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}40, transparent)`,
              left: `${(i * 29) % 100}%`,
              top: `${(i * 47) % 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.2) % 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
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
              Neural Leaderboard
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Elite hackers of the quantum realm
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { icon: Users, label: "Active Hackers", value: "847", color: colors.primary },
            { icon: Activity, label: "Daily Solves", value: "156", color: colors.secondary },
            { icon: Zap, label: "Total Points", value: "89.2K", color: colors.success }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{
                    background: `${stat.color}20`,
                    border: `1px solid ${stat.color}40`
                  }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
            border: `1px solid ${colors.border}`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Cyber grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(${colors.primary}40 1px, transparent 1px),
                linear-gradient(90deg, ${colors.primary}40 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8" style={{ color: colors.primary }} />
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                Top Neural Hackers
              </h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-16 rounded-lg"
                    style={{ background: `${colors.textSecondary}10` }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}30)`,
                      border: `1px solid ${colors.border}`,
                      boxShadow: user.rank <= 3 ? `0 0 20px ${getRankGlow(user.rank)}20` : 'none'
                    }}
                  >
                    {/* Rank */}
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl relative"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
                          border: `2px solid ${user.isOnline ? colors.success : colors.textSecondary}40`
                        }}
                      >
                        {user.avatar}
                      </div>
                      {user.isOnline && (
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full"
                          style={{ background: colors.success }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: colors.text }}>
                        {user.username}
                      </h3>
                      <div className="flex items-center gap-3 text-sm" style={{ color: colors.textSecondary }}>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {user.challengesSolved} solved
                        </span>
                        <span className={user.isOnline ? "text-green-400" : ""}>
                          {user.isOnline ? "• Online" : "• Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <p className="text-xl font-bold" style={{ color: colors.primary }}>
                        {user.score.toLocaleString()}
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        Neural Credits
                      </p>
                    </div>

                    {/* Rank Number */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: user.rank <= 3 ? `${getRankGlow(user.rank)}20` : `${colors.textSecondary}20`,
                        color: user.rank <= 3 ? getRankGlow(user.rank) : colors.textSecondary
                      }}
                    >
                      #{user.rank}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
