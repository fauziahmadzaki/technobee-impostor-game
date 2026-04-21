import { useState } from "react";
import { GameState } from "@/app/page";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
}

export default function RevealPhase({ gameState, updateGameState }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // We determine what to show based on the local cached index to avoid layout shift mid-animation
  const [viewedPlayerIndex, setViewedPlayerIndex] = useState(gameState.currentPlayerIndex);
  const isImpostor = gameState.impostorIndices.includes(viewedPlayerIndex);

  const handleNext = () => {
    if (isTransitioning) return;
    
    if (gameState.currentPlayerIndex < gameState.playersCount - 1) {
      setIsFlipped(false);
      setIsTransitioning(true);
      
      // Wait for the flip animation (duration: 1s) to finish before passing to next person
      setTimeout(() => {
        const nextIdx = gameState.currentPlayerIndex + 1;
        setViewedPlayerIndex(nextIdx);
        updateGameState({
          currentPlayerIndex: nextIdx,
        });
        setIsTransitioning(false);
      }, 500); // 500ms is enough to let the face hide completely during the 1s spring animation
    } else {
      updateGameState({ phase: "playing" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full [perspective:1000px]">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-200">
          Pemain {gameState.currentPlayerIndex + 1}
        </h2>
        <p className="text-sm text-slate-400">
          {isFlipped ? "Hafalkan peranmu!" : "Klik kartu untuk melihat peran rahasiamu"}
        </p>
      </div>

      <div 
        className="relative w-full h-[280px] cursor-pointer group"
        onClick={() => !isFlipped && !isTransitioning && setIsFlipped(true)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          {/* Card Front (Hidden) */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400">
              <EyeOff size={32} />
            </div>
            <span className="text-lg font-medium text-slate-300">Tap untuk Buka</span>
          </div>

          {/* Card Back (Revealed) */}
          <div 
            className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl border ${
              isImpostor 
                ? "bg-gradient-to-br from-red-900/40 to-rose-900/40 border-red-500/30" 
                : "bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/30"
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              isImpostor ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
            }`}>
              <Eye size={32} />
            </div>
            
            <span className="text-xl font-bold mb-1">
              {isImpostor ? "Kamu adalah IMPOSTOR!" : "Kamu adalah PEMAIN"}
            </span>
            
            <p className="text-slate-300 text-center">
              {isImpostor ? (
                <>
                  Berbaurlah dan coba tebak apa kata rahasianya.
                  {gameState.gameMode === "with_clue" && gameState.secretCategory && (
                    <span className="block mt-3 text-sm border-t border-red-500/30 pt-2">
                      Clue Kategori: <br />
                      <strong className="text-white text-base">{gameState.secretCategory}</strong>
                    </span>
                  )}
                </>
              ) : (
                <>Kata Rahasia: <span className="font-bold text-white text-lg block mt-2 tracking-wider">{gameState.secretWord}</span></>
              )}
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFlipped && !isTransitioning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full mt-4"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="w-full py-3.5 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold text-lg transition-all active:scale-95"
            >
              {gameState.currentPlayerIndex < gameState.playersCount - 1 
                ? "Sembunyikan & Lanjut" 
                : "Mulai Diskusi"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && typeof window !== "undefined" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-bold">Mengoper ke Pemain {gameState.currentPlayerIndex + 2}...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
