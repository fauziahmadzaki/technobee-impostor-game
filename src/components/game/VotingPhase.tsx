import { GameState } from "@/app/page";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

export default function VotingPhase({ gameState, updateGameState }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (playerIndex: number) => {
    setSelected(prev => {
      if (prev.includes(playerIndex)) {
        return prev.filter(idx => idx !== playerIndex);
      }
      if (prev.length < gameState.impostorsCount) {
        return [...prev, playerIndex];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    if (selected.length === gameState.impostorsCount) {
      updateGameState({
        selectedImpostorGuesses: selected,
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
          Pilih <span className="font-bold text-white">{gameState.impostorsCount}</span> pemain yang kalian curigai sebagai Impostor.
          <br/>
          <span className="text-xs text-rose-400">({selected.length} dari {gameState.impostorsCount} dipilih)</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4">
        {Array.from({ length: gameState.playersCount }).map((_, index) => {
          const isSelected = selected.includes(index);
          const isDisabled = !isSelected && selected.length >= gameState.impostorsCount;
          return (
            <motion.button
              key={index}
              whileHover={{ scale: isSelected || isDisabled ? 1 : 1.05 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              onClick={() => toggleSelect(index)}
              className={`p-4 rounded-xl font-medium transition-all flex flex-col items-center gap-2 border ${
                isSelected 
                  ? "bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]" 
                  : isDisabled
                    ? "bg-slate-800/50 border-slate-700/50 text-slate-500 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-500 text-slate-200"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                isSelected ? "bg-rose-500 text-white" : "bg-slate-700/50 text-slate-400"
              }`}>
                {index + 1}
              </div>
              Pemain {index + 1}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length === gameState.impostorsCount && (
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
              <Check size={24} /> Kunci Pilihan
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
