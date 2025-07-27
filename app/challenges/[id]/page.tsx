"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame } from "@/contexts/GameContext";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  CheckCircle, 
  ArrowLeft,
  Code,
  Shield,
  Eye
} from "lucide-react";

interface ChallengeData {
  title: string;
  description: string;
  difficulty: string;
  points: number;
  clue: string;
  answer: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export default function ChallengeDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { colors } = useTheme();
  const { updateScore } = useGame();

  const [clue, setClue] = useState("Initializing neural connection...");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);

  useEffect(() => {
    // Mock challenge data
    const mockChallenges: Record<string, ChallengeData> = {
      "1": {
        title: "Neural SQL Injection",
        description: "Infiltrate the database through quantum SQL vulnerabilities",
        difficulty: "Easy",
        points: 100,
        clue: "The login form accepts any input. Try bypassing authentication with SQL injection. Hint: ' OR '1'='1",
        answer: "admin' OR '1'='1' --",
        icon: Code
      },
      "2": {
        title: "XSS Quantum Bypass",
        description: "Breach dimensional XSS protection protocols",
        difficulty: "Medium", 
        points: 200,
        clue: "Find a way to execute JavaScript in the comment field. The filter blocks <script> tags.",
        answer: "<img src=x onerror=alert('XSS')>",
        icon: Shield
      },
      "3": {
        title: "Digital Forensics Matrix",
        description: "Trace data fragments through the cyber-matrix",
        difficulty: "Easy",
        points: 150,
        clue: "Examine the network traffic logs. Look for suspicious base64 encoded data.",
        answer: "dGVzdF9mbGFn",
        icon: Eye
      }
    };

    // Simulate loading
    const timer = setTimeout(() => {
      const challenge = mockChallenges[id as string];
      if (challenge) {
        setChallengeData(challenge);
        setClue(challenge.clue);
      } else {
        setClue("Neural pathway not found. Challenge does not exist.");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  const submitAnswer = async () => {
    if (!challengeData) return;
    
    setLoading(true);
    setFeedback("");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (userInput.toLowerCase().includes(challengeData.answer.toLowerCase())) {
      setFeedback("✅ Neural pathway secured! Quantum credits transferred...");
      updateScore(challengeData.points);
      setTimeout(() => router.push("/dashboard"), 2000);
    } else {
      setFeedback("❌ Access denied. Neural pattern mismatch detected.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated cyber background */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-20"
            style={{
              background: `linear-gradient(180deg, transparent, ${colors.primary}60, transparent)`,
              left: `${(i * 23) % 100}%`,
              top: `${(i * 31) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.15) % 3,
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
              className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
              }}
            >
              {challengeData?.title || "Loading Challenge..."}
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Neural Interface Terminal • Challenge #{id}
            </p>
          </div>
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-8 relative overflow-hidden mb-6"
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
            {/* Challenge Info */}
            {challengeData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mb-6"
              >
                <div 
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <challengeData.icon className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: colors.text }}>
                    {challengeData.description}
                  </h2>
                  <div className="flex gap-3 mt-2">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: `${colors.warning}20`,
                        color: colors.warning,
                        border: `1px solid ${colors.warning}40`
                      }}
                    >
                      {challengeData.difficulty}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        background: `${colors.success}20`,
                        color: colors.success,
                        border: `1px solid ${colors.success}40`
                      }}
                    >
                      {challengeData.points} Neural Credits
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl p-6 font-mono"
              style={{
                background: `linear-gradient(135deg, ${colors.background}90, ${colors.background}70)`,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4" style={{ color: colors.primary }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Neural Terminal v2.5.7
                </span>
                <motion.div
                  className="w-2 h-2 rounded-full ml-2"
                  style={{ background: colors.success }}
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <p style={{ color: colors.primary }}>
                  root@cyberforge:~$ initialize_challenge_{id}
                </p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{ color: colors.text }}
                >
                  {clue}
                </motion.p>
              </div>
              
              <div className="flex gap-2">
                <span style={{ color: colors.primary }}>root@cyberforge:~$</span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && submitAnswer()}
                  placeholder="Enter neural command..."
                  className="flex-1 bg-transparent outline-none font-mono"
                  style={{ color: colors.text }}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={submitAnswer}
              disabled={loading || !userInput.trim()}
              className="w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: loading || !userInput.trim()
                  ? `${colors.textSecondary}20`
                  : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: loading || !userInput.trim() ? colors.textSecondary : '#ffffff',
                border: `1px solid ${loading || !userInput.trim() ? colors.textSecondary + '40' : colors.border}`,
                boxShadow: !loading && userInput.trim() ? `0 0 20px ${colors.glow}30` : 'none'
              }}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-5 h-5" />
                  </motion.div>
                  Processing Neural Pattern...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Execute Neural Command
                </>
              )}
            </motion.button>

            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl font-mono text-center"
                style={{
                  background: feedback.includes('✅') 
                    ? `${colors.success}20` 
                    : `${colors.error}20`,
                  border: `1px solid ${feedback.includes('✅') ? colors.success : colors.error}40`,
                  color: feedback.includes('✅') ? colors.success : colors.error
                }}
              >
                {feedback.includes('✅') && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex items-center justify-center gap-2 mb-2"
                  >
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold">NEURAL BREACH SUCCESSFUL</span>
                  </motion.div>
                )}
                {feedback}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
