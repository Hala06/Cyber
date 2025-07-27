"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame } from "@/contexts/GameContext";
import { 
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  Star,
  Edit,
  Award,
  Zap,
  Activity,
  Calendar,
  Code,
  Database
} from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const { colors } = useTheme();
  const { gameState } = useGame();
  const [isEditing, setIsEditing] = useState(false);

  // Mock user stats
  const userStats = {
    username: gameState.username || "CyberAgent",
    avatar: "🦾",
    joinDate: "2024-01-15",
    totalScore: gameState.score,
    rank: 42,
    challengesSolved: gameState.completedLevels.length,
    totalChallenges: 15,
    averageTime: "12m 34s",
    longestStreak: 7,
    currentStreak: 3,
    favoriteCategory: "Web Security",
    lastActive: "2 hours ago"
  };

  const achievements = [
    {
      title: "First Blood",
      description: "Solved your first challenge",
      icon: "🩸",
      unlocked: true,
      rarity: "Common"
    },
    {
      title: "Speed Demon",
      description: "Solved a challenge in under 5 minutes",
      icon: "⚡",
      unlocked: true,
      rarity: "Rare"
    },
    {
      title: "Neural Hacker",
      description: "Solved 10 challenges",
      icon: "🧠",
      unlocked: gameState.completedLevels.length >= 10,
      rarity: "Epic"
    },
    {
      title: "Quantum Master",
      description: "Reached level 15",
      icon: "🌌",
      unlocked: gameState.currentLevel >= 15,
      rarity: "Legendary"
    },
    {
      title: "Code Breaker",
      description: "Solved all crypto challenges",
      icon: "🔓",
      unlocked: false,
      rarity: "Mythic"
    },
    {
      title: "Ghost in the Shell",
      description: "Solved all steganography challenges",
      icon: "👻",
      unlocked: false,
      rarity: "Mythic"
    }
  ];

  const recentActivity = [
    {
      type: "challenge_solved",
      title: "SQL Injection Basics",
      time: "2 hours ago",
      points: 100,
      icon: Database
    },
    {
      type: "level_up",
      title: "Reached Level 5",
      time: "1 day ago",
      points: 0,
      icon: Star
    },
    {
      type: "challenge_solved",
      title: "XSS Detection",
      time: "2 days ago",
      points: 150,
      icon: Code
    },
    {
      type: "achievement",
      title: "Speed Demon Achievement",
      time: "3 days ago",
      points: 50,
      icon: Trophy
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return colors.textSecondary;
      case 'Rare': return colors.primary;
      case 'Epic': return colors.secondary;
      case 'Legendary': return colors.warning;
      case 'Mythic': return colors.error;
      default: return colors.textSecondary;
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated cyber background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-32"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}30, transparent)`,
              left: `${(i * 19) % 100}%`,
              top: `${(i * 41) % 100}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: (i * 0.25) % 5,
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
          
          <div className="flex-1">
            <h1 
              className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
            >
              Neural Profile
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Your hacker statistics and achievements
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="p-3 rounded-xl transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
              border: `1px solid ${colors.border}`,
              color: colors.text
            }}
          >
            <Edit className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
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

              <div className="relative z-10 text-center">
                {/* Avatar */}
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 text-4xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
                    border: `3px solid ${colors.border}`
                  }}
                >
                  {userStats.avatar}
                </div>

                {/* Username */}
                <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                  {userStats.username}
                </h2>

                {/* Rank */}
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{
                    background: `${colors.primary}20`,
                    border: `1px solid ${colors.primary}40`
                  }}
                >
                  <Trophy className="w-4 h-4" style={{ color: colors.primary }} />
                  <span className="font-medium" style={{ color: colors.primary }}>
                    Rank #{userStats.rank}
                  </span>
                </div>

                {/* Join Date */}
                <div className="flex items-center justify-center gap-2 text-sm" style={{ color: colors.textSecondary }}>
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(userStats.joinDate).toLocaleDateString()}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {[
                { label: "Total Score", value: userStats.totalScore.toLocaleString(), icon: Zap, color: colors.primary },
                { label: "Challenges Solved", value: `${userStats.challengesSolved}/${userStats.totalChallenges}`, icon: Target, color: colors.success },
                { label: "Current Streak", value: `${userStats.currentStreak} days`, icon: Activity, color: colors.warning },
                { label: "Average Time", value: userStats.averageTime, icon: Clock, color: colors.secondary }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="rounded-xl p-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}30)`,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {stat.label}
                      </p>
                      <p className="font-semibold" style={{ color: colors.text }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Achievements & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  Neural Achievements
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`rounded-xl p-4 transition-all duration-300 ${
                      achievement.unlocked ? "hover:scale-105" : "opacity-50"
                    }`}
                    style={{
                      background: achievement.unlocked 
                        ? `linear-gradient(135deg, ${getRarityColor(achievement.rarity)}20, ${getRarityColor(achievement.rarity)}10)`
                        : `${colors.textSecondary}10`,
                      border: `1px solid ${achievement.unlocked ? getRarityColor(achievement.rarity) + '40' : colors.textSecondary + '20'}`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {achievement.unlocked ? achievement.icon : "🔒"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: colors.text }}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                          {achievement.description}
                        </p>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: `${getRarityColor(achievement.rarity)}20`,
                            color: getRarityColor(achievement.rarity)
                          }}
                        >
                          {achievement.rarity}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                border: `1px solid ${colors.border}`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6" style={{ color: colors.primary }} />
                <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                  Recent Activity
                </h3>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}30)`,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div 
                      className="p-2 rounded-lg"
                      style={{
                        background: `${colors.primary}20`,
                        border: `1px solid ${colors.primary}40`
                      }}
                    >
                      <activity.icon className="w-4 h-4" style={{ color: colors.primary }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: colors.text }}>
                        {activity.title}
                      </h4>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {activity.time}
                      </p>
                    </div>
                    {activity.points > 0 && (
                      <div className="text-right">
                        <p className="font-semibold" style={{ color: colors.success }}>
                          +{activity.points}
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          points
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
