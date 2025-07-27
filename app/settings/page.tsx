"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  ArrowLeft,
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Monitor,
  Save,
  RotateCcw
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { colors, theme, toggleTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoSave: true,
    publicProfile: false,
    difficulty: 'medium',
    language: 'en'
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      notifications: true,
      soundEffects: true,
      autoSave: true,
      publicProfile: false,
      difficulty: 'medium',
      language: 'en'
    });
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated cyber background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-24"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}25, transparent)`,
              left: `${(i * 31) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: (i * 0.4) % 6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
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
              Neural Settings
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Configure your hacker interface preferences
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6" style={{ color: colors.primary }} />
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  Appearance
                </h2>
              </div>

              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium" style={{ color: colors.text }}>
                      Dark Mode
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Switch between light and dark themes
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className="relative w-16 h-8 rounded-full p-1 transition-all duration-300"
                    style={{
                      background: theme === 'dark' 
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                        : `${colors.textSecondary}30`
                    }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                      animate={{
                        x: theme === 'dark' ? 32 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    >
                      {theme === 'dark' ? (
                        <Monitor className="w-3 h-3 text-gray-800" />
                      ) : (
                        <Monitor className="w-3 h-3 text-gray-600" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>

                {/* Difficulty Preference */}
                <div>
                  <h3 className="font-medium mb-3" style={{ color: colors.text }}>
                    Default Difficulty
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['easy', 'medium', 'hard'].map((difficulty) => (
                      <motion.button
                        key={difficulty}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateSetting('difficulty', difficulty)}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize"
                        style={{
                          background: settings.difficulty === difficulty
                            ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                            : `${colors.textSecondary}20`,
                          color: settings.difficulty === difficulty ? '#ffffff' : colors.text,
                          border: `1px solid ${settings.difficulty === difficulty ? colors.border : colors.textSecondary + '40'}`
                        }}
                      >
                        {difficulty}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6" style={{ color: colors.primary }} />
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  General
                </h2>
              </div>

              <div className="space-y-6">
                {/* Toggle Settings */}
                {[
                  { key: 'notifications', label: 'Notifications', description: 'Receive challenge updates and achievements', icon: Bell },
                  { key: 'soundEffects', label: 'Sound Effects', description: 'Enable interface sound feedback', icon: Volume2 },
                  { key: 'autoSave', label: 'Auto Save', description: 'Automatically save your progress', icon: Save },
                  { key: 'publicProfile', label: 'Public Profile', description: 'Allow others to view your profile', icon: User }
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <setting.icon className="w-5 h-5" style={{ color: colors.primary }} />
                      <div>
                        <h3 className="font-medium" style={{ color: colors.text }}>
                          {setting.label}
                        </h3>
                        <p className="text-sm" style={{ color: colors.textSecondary }}>
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateSetting(setting.key, !settings[setting.key as keyof typeof settings])}
                      className="relative w-12 h-6 rounded-full p-1 transition-all duration-300"
                      style={{
                        background: settings[setting.key as keyof typeof settings]
                          ? `linear-gradient(135deg, ${colors.success}, ${colors.success}80)`
                          : `${colors.textSecondary}30`
                      }}
                    >
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full shadow-lg"
                        animate={{
                          x: settings[setting.key as keyof typeof settings] ? 24 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6" style={{ color: colors.primary }} />
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  Security
                </h2>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 rounded-xl text-left transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}30)`,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <h3 className="font-medium" style={{ color: colors.text }}>
                    Change Password
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Update your account password
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 rounded-xl text-left transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.background}60, ${colors.background}30)`,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <h3 className="font-medium" style={{ color: colors.text }}>
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Enhance account security
                  </p>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.surface}80, ${colors.surface}40)`,
              border: `1px solid ${colors.border}`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-6" style={{ color: colors.text }}>
                Actions
              </h2>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetSettings}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl font-medium transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.warning}20, ${colors.warning}10)`,
                    border: `1px solid ${colors.warning}40`,
                    color: colors.warning
                  }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset to Defaults
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl font-medium transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: '#ffffff',
                    boxShadow: `0 0 20px ${colors.glow}30`
                  }}
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
