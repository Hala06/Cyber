interface ScoreBarProps {
  label: string;
  value: number;
  goal: number;
}

export default function ScoreBar({ label, value, goal }: ScoreBarProps) {
  const percentage = Math.min(100, Math.round((value / goal) * 100));

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value} / {goal}</span>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
