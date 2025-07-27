"use client";

import { useRouter } from "next/navigation";

interface ChallengeCardProps {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
}

export default function ChallengeCard({ id, title, difficulty, points }: ChallengeCardProps) {
  const router = useRouter();

  const colorMap = {
    Easy: "bg-green-600",
    Medium: "bg-yellow-600",
    Hard: "bg-red-600",
  };

  return (
    <div className="bg-card p-4 rounded-xl shadow-md border border-gray-700">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span className={`px-2 py-1 rounded ${colorMap[difficulty]}`}>{difficulty}</span>
        <span>{points} pts</span>
      </div>
      <button
        onClick={() => router.push(`/challenges/${id}`)}
        className="mt-4 w-full py-2 rounded bg-accent hover:bg-purple-400 transition"
      >
        Start
      </button>
    </div>
  );
}
