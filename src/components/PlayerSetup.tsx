import { motion } from "framer-motion";

interface PlayerSetupProps {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  handleStart: () => void;
}

export function PlayerSetup({ numPlayers, setNumPlayers, handleStart }: PlayerSetupProps) {
  return (
    <motion.div
      key="setup"
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
        <h2 className="text-2xl mb-6 text-pink-600 font-bold">How many players?</h2>

        <div className="flex justify-center gap-4 mb-8">
          {[2, 3, 4].map((num) => (
            <motion.button
              key={num}
              onClick={() => setNumPlayers(num)}
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-all duration-300 ease-in-out ${
                numPlayers === num
                  ? "border-pink-500 bg-pink-50 text-pink-600 shadow-md"
                  : "border-gray-200 bg-gray-100 text-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: num * 0.1 }}
            >
              {num}
            </motion.button>
          ))}
        </div>

        <motion.button
          onClick={handleStart}
          className="bg-pink-500 text-white text-xl py-3 px-10 rounded-full shadow-md hover:bg-pink-600 transition-all w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Continue →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}