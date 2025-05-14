import { motion } from "framer-motion";
import { DiceImage } from "./DiceImage";

interface PlayerControlsProps {
  playerNames: string[];
  currentPlayer: number;
  currentScore: number;
  diceValue: number;
  isRolling: boolean;
  handleRoll: () => void;
  handleHold: () => void;
  getPlayerColor: (index: number) => string;
}

export function PlayerControls({
  playerNames,
  currentPlayer,
  currentScore,
  diceValue,
  isRolling,
  handleRoll,
  handleHold,
  getPlayerColor,
}: PlayerControlsProps) {
  return (
    <motion.div
      className="flex-1 bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg flex flex-col items-center text-center"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl mb-6 font-bold" style={{ color: getPlayerColor(currentPlayer) }}>
        {playerNames[currentPlayer]}'s Turn
      </h2>

      <div className="my-6 perspective-600">
        <motion.div
          animate={
            isRolling
              ? {
                  rotateX: [0, 360, 720, 1080],
                  rotateY: [0, 360, 720, 1080],
                  scale: [1, 0.8, 1.2, 1],
                }
              : {}
          }
          transition={{ duration: 0.8 }}
        >
          <DiceImage value={diceValue} size={140} isRolling={isRolling} />
        </motion.div>
      </div>

      <motion.div
        className="my-6 p-6 bg-gray-50 rounded-2xl shadow-sm w-4/5 border-2"
        style={{ borderColor: getPlayerColor(currentPlayer) }}
        animate={{
          scale: [1, 1.03, 1],
          borderWidth: currentScore > 10 ? "4px" : "2px",
        }}
        transition={{
          scale: {
            duration: 0.3,
            repeat: currentScore > 0 ? 1 : 0,
            repeatDelay: 0.2,
          },
        }}
      >
        <div className="text-lg mb-2 text-gray-600">Current Round Score:</div>
        <div className="text-4xl font-bold" style={{ color: getPlayerColor(currentPlayer) }}>
          {currentScore}
        </div>
      </motion.div>

      <div className="flex gap-6 mt-4">
        <motion.button
          onClick={handleRoll}
          disabled={isRolling}
          className="bg-purple-500 text-white py-3 px-8 rounded-full text-lg font-medium shadow-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Roll 🎲
        </motion.button>
        <motion.button
          onClick={handleHold}
          disabled={isRolling || currentScore === 0}
          className="bg-green-500 text-white py-3 px-8 rounded-full text-lg font-medium shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Hold ✋
        </motion.button>
      </div>

      <div className="mt-8 p-4 bg-pink-50 rounded-xl border border-pink-200">
        <h3 className="text-lg font-medium text-pink-700 mb-2">Game Tips</h3>
        <p className="text-sm text-pink-600">
          {currentScore < 10
            ? "Keep rolling to build up your score!"
            : currentScore < 20
              ? "Getting risky! Consider holding soon."
              : "Danger zone! Hold now or risk losing it all!"}
        </p>
      </div>
    </motion.div>
  );
}