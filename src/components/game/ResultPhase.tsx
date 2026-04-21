import { GameState } from "@/app/page";
import { motion } from "framer-motion";
import { PartyPopper, Skull, RotateCcw } from "lucide-react";
// JSConfetti imported dynamically below to prevent SSR issues
import { useEffect, useRef } from "react";

interface Props {
  gameState: GameState;
  resetGame: () => void;
}

export default function ResultPhase({ gameState, resetGame }: Props) {
  const isCorrect = gameState.selectedImpostorGuesses.length === gameState.impostorsCount && 
                    gameState.selectedImpostorGuesses.every(g => gameState.impostorIndices.includes(g));
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    
    // Dynamic import to prevent SSR issues with js-confetti
    if (typeof window !== "undefined" && isCorrect) {
      import("js-confetti").then((module) => {
        const JSConfetti = module.default;
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          emojis: ['🎉', '✨', '👏'],
          confettiNumber: 100,
        });
      });
    }
  }, [isCorrect]);

  const impostorsListStr = gameState.impostorIndices
    .map(idx => idx + 1)
    .sort((a,b) => a-b)
    .join(", ");

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 w-full text-center"
    >
      <div className="space-y-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center shadow-2xl ${
            isCorrect 
              ? "bg-emerald-500/20 text-emerald-400 border-4 border-emerald-500/30" 
              : "bg-red-500/20 text-red-400 border-4 border-red-500/30"
          }`}
        >
          {isCorrect ? (
            <PartyPopper size={56} className="animate-bounce" />
          ) : (
            <Skull size={56} className="animate-pulse" />
          )}
        </motion.div>
        
        <h2 className={`text-4xl font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
          {isCorrect ? "Tebakan Benar!" : "Tebakan Salah!"}
        </h2>
        <p className="text-xl text-slate-300">
          Impostor yang sebenarnya: <span className="font-bold text-white">Pemain {impostorsListStr}</span>
        </p>
      </div>

      <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/50 w-full mb-4">
        <p className="text-slate-400 text-sm mb-1">Kata Rahasia:</p>
        <p className="text-2xl font-bold text-white tracking-widest uppercase">
          {gameState.secretWord}
        </p>
      </div>

      <button
        onClick={resetGame}
        className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <RotateCcw size={20} /> Main Lagi
      </button>
    </motion.div>
  );
}
