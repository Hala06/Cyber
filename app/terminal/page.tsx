"use client";

import { useState } from "react";

export default function TerminalPage() {
  const [history, setHistory] = useState<string[]>([
    "CyberQuest Terminal v1.0.0",
    'Type "help" for available commands.',
  ]);
  const [input, setInput] = useState("");

  const handleCommand = (cmd: string) => {
    let response = "";

    switch (cmd.toLowerCase()) {
      case "help":
        response = "Available commands: help, clear, echo [text], flag";
        break;
      case "clear":
        setHistory([]);
        return;
      case "flag":
        response = "🤫 You’re looking in the right place...";
        break;
      default:
        if (cmd.startsWith("echo ")) {
          response = cmd.slice(5);
        } else {
          response = `Unknown command: ${cmd}`;
        }
        break;
    }

    setHistory((prev) => [...prev, `$ ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-inner shadow-green-500/20">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}

        <form onSubmit={handleSubmit} className="flex mt-4">
          <span className="mr-2">$</span>
          <input
            className="flex-1 bg-transparent outline-none text-green-300"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </main>
  );
}
