import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameRules } from "./GameRules";
import { PlayerSetup } from "./PlayerSetup";
import { NameEntry } from "./NameEntry";
import { GameBoard } from "./GameBoard";
import { GameOver } from "./GameOver";
import { WelcomeScreen } from "./WelcomeScreen";
import useSound from "../hooks/useSound";
import { DiceImage } from "./DiceImage";

export type GameStep = "welcome" | "rules" | "setup" | "nameEntry" | "game" | "over";

export default function PigFiesta() {
  const [step, setStep] = useState<GameStep>("welcome");
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [playerScores, setPlayerScores] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [showRolledOne, setShowRolledOne] = useState<boolean>(false);
  const [showTurnChange, setShowTurnChange] = useState<boolean>(false);
  const [nextPlayerIndex, setNextPlayerIndex] = useState<number>(0);

  const maxScore = 50;
  const { playRollSound, playHoldSound, playWinSound, playOinkSound } = useSound();

  const handleShowRules = () => {
    playOinkSound();
    setStep("rules");
  };

  const handleSetup = () => {
    playOinkSound();
    setStep("setup");
  };

  const handleStart = () => {
    playOinkSound();
    setPlayerNames(new Array(numPlayers).fill(""));
    setStep("nameEntry");
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleBeginGame = () => {
    if (playerNames.some((name) => name.trim() === "")) {
      alert("Please enter all player names.");
      return;
    }
    playOinkSound();
    setPlayerScores(new Array(numPlayers).fill(0));
    setStep("game");
  };

  const rollDice = (): number => Math.floor(Math.random() * 6) + 1;

  const handleRoll = async () => {
    setIsRolling(true);
    playRollSound();

    // Simulate multiple dice rolls for effect
    for (let i = 0; i < 5; i++) {
      setDiceValue(rollDice());
      await new Promise((res) => setTimeout(res, 100));
    }

    await new Promise((res) => setTimeout(res, 300));
    const roll = rollDice();
    setDiceValue(roll);
    setIsRolling(false);

    if (roll === 1) {
      setShowRolledOne(true);
      setTimeout(() => {
        setShowRolledOne(false);
        setCurrentScore(0);
        setNextPlayerIndex((currentPlayer + 1) % numPlayers);
        setShowTurnChange(true);
        setTimeout(() => {
          setShowTurnChange(false);
          nextPlayer();
        }, 1500);
      }, 2000);
    } else {
      setCurrentScore((prev) => prev + roll);
    }
  };

  const handleHold = () => {
    playHoldSound();
    const newScores = [...playerScores];
    newScores[currentPlayer] += currentScore;
    setPlayerScores(newScores);
    setCurrentScore(0);

    if (newScores[currentPlayer] >= maxScore) {
      setWinner(currentPlayer);
      setStep("over");
      playWinSound();
    } else {
      setNextPlayerIndex((currentPlayer + 1) % numPlayers);
      setShowTurnChange(true);
      setTimeout(() => {
        setShowTurnChange(false);
        nextPlayer();
      }, 1500);
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
  };

  const resetGame = () => {
    setStep("welcome");
    setNumPlayers(2);
    setPlayerNames([]);
    setPlayerScores([]);
    setCurrentPlayer(0);
    setCurrentScore(0);
    setWinner(null);
    setDiceValue(1);
  };

  const getPlayerColor = (index: number) => {
    const colors = ["#FF6B6B", "#51CF66", "#339AF0", "#FF922B"];
    return colors[index % colors.length];
  };

  return (
    <main className="relative min-h-screen overflow-hidden p-4 md:p-8 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      {/* Floating pig emojis background */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl opacity-30"
            initial={{ y: -20, x: `${5 + i * 6}%` }}
            animate={{
              y: ["0%", "100%"],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              y: {
                duration: 15 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              },
              rotate: {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "reverse",
              },
            }}
          >
            {i % 3 === 0 ? "🐷" : i % 3 === 1 ? "🎲" : "✨"}
          </motion.span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <WelcomeScreen handleShowRules={handleShowRules} />
        )}

        {step === "rules" && (
          <GameRules handleSetup={handleSetup} />
        )}

        {step === "setup" && (
          <PlayerSetup 
            numPlayers={numPlayers} 
            setNumPlayers={setNumPlayers} 
            handleStart={handleStart} 
          />
        )}

        {step === "nameEntry" && (
          <NameEntry 
            playerNames={playerNames} 
            handleNameChange={handleNameChange} 
            handleBeginGame={handleBeginGame} 
            getPlayerColor={getPlayerColor}
          />
        )}

        {step === "game" && (
          <GameBoard 
            playerNames={playerNames}
            playerScores={playerScores}
            currentPlayer={currentPlayer}
            currentScore={currentScore}
            diceValue={diceValue}
            isRolling={isRolling}
            showRolledOne={showRolledOne}
            showTurnChange={showTurnChange}
            nextPlayerIndex={nextPlayerIndex}
            maxScore={maxScore}
            handleRoll={handleRoll}
            handleHold={handleHold}
            getPlayerColor={getPlayerColor}
          />
        )}

        {step === "over" && winner !== null && (
          <GameOver 
            winner={winner}
            playerNames={playerNames}
            playerScores={playerScores}
            getPlayerColor={getPlayerColor}
            resetGame={resetGame}
          />
        )}
      </AnimatePresence>
    </main>
  );
}