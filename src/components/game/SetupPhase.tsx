import { Users, UserMinus, Info, ChevronDown, ChevronUp } from "lucide-react";
import { GameState } from "@/app/page";
import { getRandomWord } from "@/lib/words";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

export default function SetupPhase({ gameState, updateGameState }: Props) {
  const [showRules, setShowRules] = useState(false);
  const maxImpostors = Math.max(1, Math.floor((gameState.playersCount - 1) / 2));

  const handleStart = () => {
    const word = getRandomWord();
    
    // Generate unique random indices for impostors
    const indices = new Set<number>();
    while (indices.size < gameState.impostorsCount) {
      indices.add(Math.floor(Math.random() * gameState.playersCount));
    }
    
    updateGameState({
      phase: "reveal",
      secretWord: word,
      impostorIndices: Array.from(indices),
      currentPlayerIndex: 0,
    });
  };

  const updatePlayers = (delta: number) => {
    const newValue = gameState.playersCount + delta;
    if (newValue >= 4 && newValue <= 12) {
      // Adjust impostor count if it exceeds new max
      const newMaxImpostors = Math.max(1, Math.floor((newValue - 1) / 2));
      updateGameState({ 
        playersCount: newValue,
        impostorsCount: Math.min(gameState.impostorsCount, newMaxImpostors)
      });
    }
  };

  const updateImpostors = (delta: number) => {
    const newValue = gameState.impostorsCount + delta;
    if (newValue >= 1 && newValue <= maxImpostors) {
      updateGameState({ impostorsCount: newValue });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Technobee Impostor
        </h1>
        <p className="text-slate-400 text-sm">Mainkan game tebak kata seru bersama teman-temanmu!</p>
      </div>

      <div className="w-full">
        <button 
          onClick={() => setShowRules(!showRules)}
          className="w-full flex items-center justify-between bg-slate-800/80 hover:bg-slate-700/80 p-4 rounded-xl border border-slate-700/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-indigo-300">
            <Info size={20} />
            <span className="font-semibold">Cara Bermain</span>
          </div>
          {showRules ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
        </button>
        
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 mt-2 bg-slate-800/50 rounded-xl border border-slate-700/50 text-sm text-slate-300 space-y-3">
                <p>1. Atur jumlah pemain dan jumlah Impostor.</p>
                <p>2. Setiap pemain akan melihat perannya secara rahasia dan bergantian. Pemain biasa akan mendapatkan <strong>Kata Rahasia</strong>, sedangkan Impostor tidak.</p>
                <p>3. Setelah semua mengetahui perannya, mulailah berdiskusi! Setiap pemain harus memberikan 1 kata/petunjuk yang berhubungan dengan kata rahasia tanpa menyebutkannya langsung.</p>
                <p>4. Impostor harus <strong>berpura-pura tahu</strong> dan memberikan petunjuk yang meyakinkan agar tidak ketahuan.</p>
                <p>5. Lakukan voting untuk menentukan siapa Impostor-nya!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl w-full border border-slate-700/50 shadow-inner flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span className="font-medium">Jumlah Pemain</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <button 
              onClick={() => updatePlayers(-1)}
              disabled={gameState.playersCount <= 4}
              className="w-10 h-10 rounded-full bg-slate-700 text-xl hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition"
            >
              -
            </button>
            <span className="text-3xl font-bold w-12 text-center text-white">
              {gameState.playersCount}
            </span>
            <button 
              onClick={() => updatePlayers(1)}
              disabled={gameState.playersCount >= 12}
              className="w-10 h-10 rounded-full bg-slate-700 text-xl hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-slate-700/50"></div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-3">
              <UserMinus size={20} className="text-rose-400" />
              <span className="font-medium">Jumlah Impostor</span>
            </div>
            <span className="text-xs text-slate-500">Maks: {maxImpostors}</span>
          </div>

          <div className="flex items-center justify-between px-2">
            <button 
              onClick={() => updateImpostors(-1)}
              disabled={gameState.impostorsCount <= 1}
              className="w-10 h-10 rounded-full bg-slate-700 text-xl hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition"
            >
              -
            </button>
            <span className="text-3xl font-bold w-12 text-center text-rose-400">
              {gameState.impostorsCount}
            </span>
            <button 
              onClick={() => updateImpostors(1)}
              disabled={gameState.impostorsCount >= maxImpostors}
              className="w-10 h-10 rounded-full bg-slate-700 text-xl hover:bg-slate-600 disabled:opacity-50 disabled:hover:bg-slate-700 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all hover:scale-[1.02] active:scale-95"
      >
        Mulai Permainan
      </button>
    </motion.div>
  );
}
