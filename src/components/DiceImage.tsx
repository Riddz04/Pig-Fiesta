interface DiceImageProps {
  value: number;
  size?: number;
  isRolling?: boolean;
}

export function DiceImage({ value, size = 80, isRolling = false }: DiceImageProps) {
  const diceImages = [
    "/dice/dice1.png",
    "/dice/dice2.png",
    "/dice/dice3.png",
    "/dice/dice4.png",
    "/dice/dice5.png",
    "/dice/dice6.png",
  ];
  
  const imgSrc = diceImages[value - 1] || diceImages[0];
  
  return (
    <img 
      src={imgSrc}
      alt={`Dice showing ${value}`}
      width={size} 
      height={size}
      className={`rounded-lg shadow-md ${isRolling ? 'animate-spin' : ''}`}
    />
  );
}