import { GameState } from "@/app/page";
import { motion } from "framer-motion";
import { MessageCircleQuestion, Timer } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

export default function PlayingPhase({ updateGameState }: Props) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-8 text-center"
    >
      <div className="space-y-4 relative w-full flex flex-col items-center">
        <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center animate-pulse">
          <MessageCircleQuestion className="text-indigo-400" size={48} />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-2">Fase Diskusi</h2>
          <p className="text-slate-400 max-w-sm mx-auto">
            Jelaskan kata rahasia kalian tanpa menyebutkannya secara langsung. Impostor harus mencoba berbaur!
          </p>
        </div>
      </div>

      <div className="bg-slate-800/50 px-6 py-4 rounded-xl border border-slate-700 font-mono text-3xl font-bold flex items-center gap-3 w-full justify-center text-slate-200">
        <Timer className="text-slate-400" size={32} />
        {formatTime(seconds)}
      </div>

      <button
        onClick={() => updateGameState({ phase: "voting" })}
        className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all hover:scale-[1.02] active:scale-95"
      >
        Waktunya Voting!
      </button>
    </motion.div>
  );
}
