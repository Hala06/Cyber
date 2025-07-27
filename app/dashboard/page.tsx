"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame } from "@/contexts/GameContext";
import Navigation from "@/components/Navigation";
import CyberAnimations from "@/components/CyberAnimations";
import { 
  Trophy,
  Target,
  Star,
  Award,
  Shield,
  Eye,
  Code,
  ArrowRight,
  Crown,
  Medal,
  Activity,
  Users,
  Flame
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { gameState } = useGame();

  // Calculate user league and position
  const getUserLeague = (score: number) => {
    if (score >= 2500) return { name: "Quantum Elite", icon: Crown, color: "#FFD700", tier: "Elite" };
    if (score >= 2000) return { name: "Cyber Master", icon: Medal, color: "#E5E7EB", tier: "Master" };
    if (score >= 1500) return { name: "Neural Hacker", icon: Shield, color: "#CD7F32", tier: "Expert" };
    if (score >= 1000) return { name: "Code Breaker", icon: Code, color: colors.primary, tier: "Advanced" };
    if (score >= 500) return { name: "Script Kiddie", icon: Target, color: colors.secondary, tier: "Intermediate" };
    return { name: "Digital Noob", icon: Star, color: colors.textSecondary, tier: "Beginner" };
  };

  const userLeague = getUserLeague(gameState.score);
  const nextLeagueScore = Math.ceil((gameState.score + 500) / 500) * 500;
  const progressToNext = ((gameState.score % 500) / 500) * 100;

  // Mock leaderboard position
  const mockPosition = 42;
  const totalUsers = 2847;

  // Recommended challenges based on user progress
  const recommendations = [
    {
      id: 1,
      title: "Neural SQL Injection",
      difficulty: "Easy",
      points: 100,
      category: "Web Security",
      icon: Code,
      reason: "Perfect for building foundational skills",
      estimatedTime: "15 min"
    },
    {
      id: 2,
      title: "XSS Quantum Bypass",
      difficulty: "Medium",
      points: 200,
      category: "Web Security", 
      icon: Shield,
      reason: "Next step in your web security journey",
      estimatedTime: "25 min"
    },
    {
      id: 3,
      title: "Digital Forensics Matrix",
      difficulty: "Easy",
      points: 150,
      category: "Forensics",
      icon: Eye,
      reason: "Explore a new skill domain",
      estimatedTime: "20 min"
    }
  ];

  // Recent achievements
  const recentAchievements = [
    { title: "First Blood", description: "Solved your first challenge", date: "2 days ago", rarity: "Common" },
    { title: "Speed Demon", description: "Solved a challenge in under 5 minutes", date: "1 week ago", rarity: "Rare" }
  ];

  const weeklyProgress = [
    { day: "Mon", challenges: 2, points: 200 },
    { day: "Tue", challenges: 1, points: 150 },
    { day: "Wed", challenges: 3, points: 350 },
    { day: "Thu", challenges: 0, points: 0 },
    { day: "Fri", challenges: 2, points: 250 },
    { day: "Sat", challenges: 1, points: 100 },
    { day: "Sun", challenges: 4, points: 400 }
  ];

  return (
    <>
      <Navigation />
      <CyberAnimations variant="grid" intensity="low">
        <div className="min-h-screen pt-20 p-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-24"
              style={{
                background: `linear-gradient(180deg, transparent, ${colors.primary}20, transparent)`,
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6 + (i % 4),
                repeat: Infinity,
                delay: (i * 0.3) % 6,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 
              className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
            >
              Neural Command Center
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Welcome back, <span style={{ color: colors.primary }}>{gameState.username}</span>. 
              Ready to hack the matrix?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats & League */}
            <div className="lg:col-span-1 space-y-6">
              {/* League Status */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${userLeague.color}20, ${userLeague.color}10)`,
                  border: `2px solid ${userLeague.color}40`,
                  boxShadow: `0 0 30px ${userLeague.color}20`
                }}
              >
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${userLeague.color}30, ${userLeague.color}50)`,
                      border: `2px solid ${userLeague.color}`
                    }}
                  >
                    <userLeague.icon className="w-8 h-8" style={{ color: userLeague.color }} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
                    {userLeague.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                    {userLeague.tier} Tier
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: colors.textSecondary }}>Progress to next</span>
                      <span style={{ color: colors.primary }}>{Math.round(progressToNext)}%</span>
                    </div>
                    <div 
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{ background: `${colors.textSecondary}20` }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressToNext}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {nextLeagueScore - gameState.score} points to next league
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Rankings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-5 h-5" style={{ color: colors.primary }} />
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    Global Ranking
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>
                      #{mockPosition}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      out of {totalUsers.toLocaleString()} hackers
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold" style={{ color: colors.text }}>
                        {gameState.score}
                      </p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        Total Points
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-bold" style={{ color: colors.text }}>
                        {gameState.completedLevels.length}
                      </p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        Solved
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Weekly Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-5 h-5" style={{ color: colors.primary }} />
                  <h3 className="font-semibold" style={{ color: colors.text }}>
                    This Week
                  </h3>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={day.day} className="text-center">
                      <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                        {day.day}
                      </p>
                      <motion.div
                        className="w-8 h-8 rounded-lg mx-auto flex items-center justify-center text-xs font-bold"
                        style={{
                          background: day.challenges > 0 
                            ? `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`
                            : `${colors.textSecondary}20`,
                          color: day.challenges > 0 ? colors.text : colors.textSecondary
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {day.challenges}
                      </motion.div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    <span style={{ color: colors.primary }}>
                      {weeklyProgress.reduce((sum, day) => sum + day.challenges, 0)} challenges
                    </span> completed this week
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Recommendations & Achievements */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended Challenges */}
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
                  <Target className="w-6 h-6" style={{ color: colors.primary }} />
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                    Recommended for You
                  </h3>
                  <Flame className="w-5 h-5" style={{ color: colors.warning }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => router.push(`/challenges/${challenge.id}`)}
                      className="rounded-xl p-4 cursor-pointer transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}40)`,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{
                            background: `${colors.primary}20`,
                            border: `1px solid ${colors.primary}40`
                          }}
                        >
                          <challenge.icon className="w-4 h-4" style={{ color: colors.primary }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
                            {challenge.title}
                          </h4>
                          <p className="text-xs" style={{ color: colors.textSecondary }}>
                            {challenge.category}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>
                        {challenge.reason}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <span 
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              background: `${colors.warning}20`,
                              color: colors.warning
                            }}
                          >
                            {challenge.difficulty}
                          </span>
                          <span 
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              background: `${colors.success}20`,
                              color: colors.success
                            }}
                          >
                            {challenge.points}pts
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3" style={{ color: colors.primary }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-2xl p-8"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                  border: `1px solid ${colors.border}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6" style={{ color: colors.primary }} />
                    <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                      Recent Achievements
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/profile")}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                      border: `1px solid ${colors.border}`,
                      color: colors.text
                    }}
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}40)`,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
                          border: `2px solid ${colors.border}`
                        }}
                      >
                        🏆
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold" style={{ color: colors.text }}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {achievement.date}
                        </p>
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            background: `${colors.primary}20`,
                            color: colors.primary
                          }}
                        >
                          {achievement.rarity}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: "All Challenges", icon: Target, route: "/challenges" },
                  { label: "Leaderboard", icon: Trophy, route: "/leaderboard" },
                  { label: "Profile", icon: Users, route: "/profile" },
                  { label: "Settings", icon: Star, route: "/settings" }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(action.route)}
                    className="p-6 rounded-xl text-center transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.surface}60, ${colors.surface}40)`,
                      border: `1px solid ${colors.border}`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <action.icon className="w-8 h-8 mx-auto mb-2" style={{ color: colors.primary }} />
                    <p className="text-sm font-medium" style={{ color: colors.text }}>
                      {action.label}
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </CyberAnimations>
    </>
  );
}
