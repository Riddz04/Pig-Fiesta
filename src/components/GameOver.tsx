import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface GameOverProps {
  winner: number;
  playerNames: string[];
  playerScores: number[];
  getPlayerColor: (index: number) => string;
  resetGame: () => void;
}

export function GameOver({ 
  winner, 
  playerNames, 
  playerScores, 
  getPlayerColor, 
  resetGame 
}: GameOverProps) {
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.4) },
        colors: ["#ff6b6b", "#51cf66", "#339af0", "#ffc107", "#ff3999"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="over"
      className="z-10 relative min-h-[80vh] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-10" />

      <h1 className="text-4xl md:text-5xl mb-8 font-bold tracking-wider z-10 relative text-pink-600 drop-shadow-lg">
        🐷 Pig Fiesta 🎉
      </h1>

      <motion.div
        className="bg-white bg-opacity-90 p-12 rounded-3xl shadow-lg w-full max-w-lg text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl mb-6 text-gray-800 font-bold">🎉 We have a winner! 🎉</h2>
        </motion.div>

        <motion.div
          className="text-5xl font-bold mb-4"
          style={{ color: getPlayerColor(winner) }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {playerNames[winner]}
        </motion.div>

        <motion.div
          className="my-8 text-xl flex items-center justify-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>wins with</span>
          <motion.span
            className="text-4xl font-bold mx-2 text-pink-600"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              repeat: 3,
              repeatDelay: 1,
              duration: 0.5,
            }}
          >
            {playerScores[winner]}
          </motion.span>
          <span>points!</span>
        </motion.div>

        {/* Final Scoreboard */}
        <motion.div
          className="mb-8 bg-gray-50 p-4 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-lg font-medium mb-3">Final Scores</h3>
          <div className="space-y-2">
            {playerScores.map((score, i) => (
              <div
                key={`final-${i}`}
                className={`flex justify-between p-2 rounded ${i === winner ? "bg-yellow-100" : ""}`}
              >
                <span style={{ color: getPlayerColor(i) }}>{playerNames[i]}</span>
                <span className="font-bold">{score}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={resetGame}
          className="bg-pink-500 text-white text-xl py-4 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Play Again 🔄
        </motion.button>
      </motion.div>
    </motion.div>
  );
}