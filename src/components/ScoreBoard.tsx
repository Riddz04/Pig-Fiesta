import { motion } from "framer-motion";

interface ScoreBoardProps {
  playerNames: string[];
  playerScores: number[];
  currentPlayer: number;
  maxScore: number;
  getPlayerColor: (index: number) => string;
}

export function ScoreBoard({ 
  playerNames, 
  playerScores, 
  currentPlayer, 
  maxScore,
  getPlayerColor 
}: ScoreBoardProps) {
  return (
    <motion.div
      className="flex-1 bg-white bg-opacity-90 p-6 rounded-3xl shadow-lg"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-6 text-gray-800 text-2xl font-bold">Scoreboard</h2>
      <div className="flex flex-col gap-4">
        {playerScores.map((score, i) => (
          <motion.div
            key={i}
            className={`flex justify-between p-4 rounded-lg border-l-4 transition-all ${
              i === currentPlayer ? "bg-gray-100 shadow-md" : "bg-white"
            }`}
            style={{ borderColor: getPlayerColor(i) }}
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: i === currentPlayer ? 1.05 : 1,
            }}
            transition={{
              delay: i * 0.1 + 0.3,
              duration: 0.3,
            }}
          >
            <div className="text-lg font-medium flex items-center">
              <div
                className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: getPlayerColor(i) }}
              >
                {i + 1}
              </div>
              {playerNames[i]}
              {i === currentPlayer && (
                <motion.span
                  className="ml-2"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  🎲
                </motion.span>
              )}
            </div>
            <div className="text-xl font-bold" style={{ color: getPlayerColor(i) }}>
              {score}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-medium mb-2">Progress to Victory</h3>
        {playerScores.map((score, i) => (
          <div key={`progress-${i}`} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{playerNames[i]}</span>
              <span>
                {score}/{maxScore}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: getPlayerColor(i) }}
                initial={{ width: 0 }}
                animate={{ width: `${(score / maxScore) * 100}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}