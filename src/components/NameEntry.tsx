import { motion } from "framer-motion";

interface NameEntryProps {
  playerNames: string[];
  handleNameChange: (index: number, name: string) => void;
  handleBeginGame: () => void;
  getPlayerColor: (index: number) => string;
}

export function NameEntry({ 
  playerNames, 
  handleNameChange, 
  handleBeginGame, 
  getPlayerColor 
}: NameEntryProps) {
  return (
    <motion.div
      key="nameEntry"
      className="flex flex-col items-center z-10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl mb-8 font-bold tracking-wider z-10 relative text-pink-600 drop-shadow-lg">
        🐷 Pig Fiesta 🎉
      </h1>

      <motion.div
        className="bg-white bg-opacity-90 p-8 rounded-3xl shadow-lg mx-4 w-full max-w-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl mb-6 text-pink-600 font-bold">Enter Player Names</h2>

        <div className="grid gap-4 mb-8 md:grid-cols-2">
          {playerNames.map((_, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                style={{ backgroundColor: getPlayerColor(idx) }}
              >
                {idx + 1}
              </div>
              <input
                type="text"
                value={playerNames[idx]}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                placeholder={`Player ${idx + 1}`}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={handleBeginGame}
          className="bg-pink-500 text-white text-xl py-3 px-10 rounded-full shadow-md hover:bg-pink-600 transition-all w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Game! 🚀
        </motion.button>
      </motion.div>
    </motion.div>
  );
}