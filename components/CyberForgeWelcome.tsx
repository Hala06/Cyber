"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Zap, 
  Shield, 
  Terminal, 
  Users, 
  Trophy,
  Target,
  ArrowRight,
  Lock,
  Eye,
  Cpu,
  Activity
} from "lucide-react";

export default function CyberForgeWelcome() {
  const router = useRouter();
  const { colors } = useTheme();

  const features = [
    {
      icon: Shield,
      title: "Web Security",
      description: "Master SQL injection, XSS, and authentication bypasses",
      challenges: 8,
      difficulty: "Easy → Hard"
    },
    {
      icon: Lock,
      title: "Cryptography",
      description: "Decode ciphers, break encryption, and crack hashes",
      challenges: 6,
      difficulty: "Medium → Expert"
    },
    {
      icon: Eye,
      title: "Digital Forensics",
      description: "Analyze network traffic, recover hidden data",
      challenges: 5,
      difficulty: "Easy → Hard"
    },
    {
      icon: Terminal,
      title: "Binary Exploitation",
      description: "Buffer overflows, reverse engineering, pwn challenges",
      challenges: 4,
      difficulty: "Hard → Elite"
    }
  ];

  const stats = [
    { label: "Active Hackers", value: "2,847", icon: Users },
    { label: "Total Challenges", value: "23", icon: Target },
    { label: "Global Rankings", value: "Live", icon: Trophy },
    { label: "Skill Levels", value: "7", icon: Activity }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cyber Matrix Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated data streams */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-0.5 h-full opacity-20"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}, transparent)`,
              left: `${(i * 8.33) % 100}%`,
            }}
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + (i % 4),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Floating cyber particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: colors.primary,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.1) % 4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
              >
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.text }}>
                  CyberForge
                </h1>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  Neural CTF Platform
                </p>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: '#ffffff',
                boxShadow: `0 0 20px ${colors.glow}30`
              }}
            >
              <Terminal className="w-4 h-4" />
              Enter the Matrix
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                }}
              >
                Welcome to the
              </h1>
              <motion.h2 
                className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`
                }}
                animate={{
                  textShadow: [
                    `0 0 20px ${colors.glow}40`,
                    `0 0 40px ${colors.glow}60`,
                    `0 0 20px ${colors.glow}40`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CyberForge
              </motion.h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ color: colors.textSecondary }}
            >
              Step into the <span style={{ color: colors.primary }}>quantum realm</span> of cybersecurity. 
              Master <span style={{ color: colors.secondary }}>neural hacking</span> techniques, 
              climb the <span style={{ color: colors.primary }}>digital leaderboard</span>, 
              and become the ultimate <span style={{ color: colors.secondary }}>cyber warrior</span>.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/dashboard")}
                className="px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: '#ffffff',
                  boxShadow: `0 10px 30px ${colors.glow}40`
                }}
              >
                <Zap className="w-5 h-5" />
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/leaderboard")}
                className="px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}60)`,
                  border: `2px solid ${colors.border}`,
                  color: colors.text,
                  backdropFilter: 'blur(20px)'
                }}
              >
                <Trophy className="w-5 h-5" />
                View Rankings
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="px-6 pb-6"
        >
          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-2xl p-8 backdrop-blur-20"
              style={{
                background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <stat.icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <p className="text-2xl font-bold mb-1" style={{ color: colors.text }}>
                      {stat.value}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="px-6 pb-12"
        >
          <div className="max-w-6xl mx-auto">
            <h3 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: colors.text }}
            >
              Master the <span style={{ color: colors.primary }}>Cyber Arts</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="rounded-xl p-6 relative overflow-hidden group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${colors.surface}60, ${colors.surface}30)`,
                    border: `1px solid ${colors.border}`,
                    backdropFilter: 'blur(20px)'
                  }}
                  onClick={() => router.push("/dashboard")}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
                      boxShadow: `inset 0 0 20px ${colors.glow}20`
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                        border: `1px solid ${colors.border}`
                      }}
                    >
                      <feature.icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                      {feature.title}
                    </h4>
                    
                    <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                      {feature.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span style={{ color: colors.primary }}>
                        {feature.challenges} challenges
                      </span>
                      <span style={{ color: colors.secondary }}>
                        {feature.difficulty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
