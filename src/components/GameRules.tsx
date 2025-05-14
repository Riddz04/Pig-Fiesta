import { motion } from "framer-motion";

interface GameRulesProps {
  handleSetup: () => void;
}

export function GameRules({ handleSetup }: GameRulesProps) {
  return (
    <motion.div
      key="rules"
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
        <h2 className="text-2xl mb-6 text-pink-600 font-bold">Game Rules</h2>
        <ul className="text-left mb-8 pl-6 space-y-4">
          {[
            "2-4 players can join the fun",
            "First player to reach 50 points wins",
            "If you roll a 1, your turn ends and you lose your current points",
            'Press "Hold" to keep your current points and end your turn',
            "Roll the dice as many times as you dare!",
          ].map((rule, index) => (
            <motion.li
              key={index}
              className="mb-3 text-lg relative pl-2 flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <span className="text-pink-500 mr-2 text-xl">•</span>
              {rule}
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={handleSetup}
          className="bg-pink-500 text-white text-xl py-3 px-10 rounded-full shadow-md hover:bg-pink-600 transition-all w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Next →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}