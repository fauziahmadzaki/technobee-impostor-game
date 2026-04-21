"use client";

import { useState } from "react";
import SetupPhase from "@/components/game/SetupPhase";
import RevealPhase from "@/components/game/RevealPhase";
import PlayingPhase from "@/components/game/PlayingPhase";
import VotingPhase from "@/components/game/VotingPhase";
import ResultPhase from "@/components/game/ResultPhase";

export type GamePhase = "setup" | "reveal" | "playing" | "voting" | "result";

export interface GameState {
  phase: GamePhase;
  playersCount: number;
  impostorsCount: number;
  impostorIndices: number[];
  secretWord: string | null;
  currentPlayerIndex: number;
  selectedImpostorGuess: number | null;
}

const initialState: GameState = {
  phase: "setup",
  playersCount: 4,
  impostorsCount: 1,
  impostorIndices: [],
  secretWord: null,
  currentPlayerIndex: 0,
  selectedImpostorGuess: null,
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(initialState);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 flex items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Global Reset Button */}
      {gameState.phase !== "setup" && (
        <button
          onClick={resetGame}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 flex items-center gap-2 rounded-full text-sm font-medium border border-slate-700/50 transition-all z-50 backdrop-blur-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Mulai Ulang
        </button>
      )}

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 w-full min-h-[400px] flex flex-col justify-center">
          {gameState.phase === "setup" && (
            <SetupPhase gameState={gameState} updateGameState={updateGameState} />
          )}
          {gameState.phase === "reveal" && (
            <RevealPhase gameState={gameState} updateGameState={updateGameState} />
          )}
          {gameState.phase === "playing" && (
            <PlayingPhase gameState={gameState} updateGameState={updateGameState} />
          )}
          {gameState.phase === "voting" && (
            <VotingPhase gameState={gameState} updateGameState={updateGameState} />
          )}
          {gameState.phase === "result" && (
            <ResultPhase gameState={gameState} resetGame={resetGame} />
          )}
        </div>
      </div>
    </main>
  );
}
