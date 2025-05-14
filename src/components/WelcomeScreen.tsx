import { motion } from "framer-motion";

interface WelcomeScreenProps {
  handleShowRules: () => void;
}

export function WelcomeScreen({ handleShowRules }: WelcomeScreenProps) {
  return (
    <motion.div
      key="welcome"
      className="flex flex-col items-center justify-center min-h-[80vh] z-10 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <h1 className="text-4xl md:text-6xl mb-8 font-bold tracking-wider z-10 relative text-pink-600 drop-shadow-lg">
          🐷 Pig Fiesta 🎉
        </h1>
      </motion.div>

      <motion.div
        className="my-8"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <img
          src="/dice/dice.png"
          alt="Dice"
          width={160}
          height={160}
          className="mx-auto"
        />
      </motion.div>

      <motion.button
        onClick={handleShowRules}
        className="bg-pink-500 text-white text-xl py-4 px-12 mt-4 rounded-full shadow-lg hover:bg-pink-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Let's Play! 🎮
      </motion.button>
    </motion.div>
  );
}
