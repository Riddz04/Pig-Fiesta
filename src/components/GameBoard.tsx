import { motion, AnimatePresence } from "framer-motion";
import { DiceImage } from "./DiceImage";
import { Notification } from "./Notification";
import { ScoreBoard } from "./ScoreBoard";
import { PlayerControls } from "./PlayerControls";

interface GameBoardProps {
  playerNames: string[];
  playerScores: number[];
  currentPlayer: number;
  currentScore: number;
  diceValue: number;
  isRolling: boolean;
  showRolledOne: boolean;
  showTurnChange: boolean;
  nextPlayerIndex: number;
  maxScore: number;
  handleRoll: () => void;
  handleHold: () => void;
  getPlayerColor: (index: number) => string;
}

export function GameBoard({
  playerNames,
  playerScores,
  currentPlayer,
  currentScore,
  diceValue,
  isRolling,
  showRolledOne,
  showTurnChange,
  nextPlayerIndex,
  maxScore,
  handleRoll,
  handleHold,
  getPlayerColor,
}: GameBoardProps) {
  return (
    <motion.div
      key="game"
      className="relative min-h-screen p-4 md:p-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl mb-8 font-bold tracking-wider z-10 relative text-pink-600 drop-shadow-lg text-center">
        🐷 Pig Fiesta 🎉
      </h1>

      <AnimatePresence>
        {showRolledOne && (
          <Notification 
            title="Oops! You rolled a 1"
            message="Your turn ends and you lose your current points"
            type="error"
          >
            <div className="mt-4">
              <DiceImage value={1} />
            </div>
          </Notification>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTurnChange && (
          <Notification 
            title="Next Player's Turn"
            message={`${playerNames[nextPlayerIndex]} is up next!`}
            type="info"
            color={getPlayerColor(nextPlayerIndex)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-8 mx-auto max-w-6xl md:flex-row">
        <ScoreBoard 
          playerNames={playerNames}
          playerScores={playerScores}
          currentPlayer={currentPlayer}
          maxScore={maxScore}
          getPlayerColor={getPlayerColor}
        />

        <PlayerControls 
          playerNames={playerNames}
          currentPlayer={currentPlayer}
          currentScore={currentScore}
          diceValue={diceValue}
          isRolling={isRolling}
          handleRoll={handleRoll}
          handleHold={handleHold}
          getPlayerColor={getPlayerColor}
        />
      </div>
    </motion.div>
  );
}