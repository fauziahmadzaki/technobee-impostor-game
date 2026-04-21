import { GameState } from "@/app/page";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

export default function VotingPhase({ gameState, updateGameState }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleConfirm = () => {
    if (selected !== null) {
      updateGameState({
        selectedImpostorGuess: selected,
        phase: "result",
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 w-full"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <UserX className="text-rose-500" /> Tahap Voting
        </h2>
        <p className="text-sm text-slate-400">
          Siapa yang kalian curigai sebagai Impostor?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4">
        {Array.from({ length: gameState.playersCount }).map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: selected === index ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(index)}
            className={`p-4 rounded-xl font-medium transition-all flex flex-col items-center gap-2 border ${
              selected === index 
                ? "bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]" 
                : "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-500 text-slate-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              selected === index ? "bg-rose-500 text-white" : "bg-slate-700/50 text-slate-400"
            }`}>
              {index + 1}
            </div>
            Pemain {index + 1}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            className="w-full mt-2"
          >
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
            >
              <Check size={24} /> Kunci Pilihan (Pemain {selected + 1})
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
