import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/contexts/GameContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "PuzzleBox CTF - Digital Treasure Hunt",
  description: "A gamified capture-the-flag platform with multi-step API challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
