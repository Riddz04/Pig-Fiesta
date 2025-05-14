import { useEffect, useRef } from 'react';

export default function useSound() {
  const rollAudioRef = useRef<HTMLAudioElement | null>(null);
  const holdAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const oinkAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    rollAudioRef.current = new Audio("/sounds/roll.mp3");
    holdAudioRef.current = new Audio("/sounds/hold.mp3");
    winAudioRef.current = new Audio("/sounds/win.mp3");
    oinkAudioRef.current = new Audio("/sounds/oink.mp3");

    // Preload the sounds
    rollAudioRef.current.load();
    holdAudioRef.current.load();
    winAudioRef.current.load();
    oinkAudioRef.current.load();

    return () => {
      rollAudioRef.current = null;
      holdAudioRef.current = null;
      winAudioRef.current = null;
      oinkAudioRef.current = null;
    };
  }, []);

  const playRollSound = () => {
    rollAudioRef.current?.play().catch(e => console.log('Sound play prevented:', e));
  };

  const playHoldSound = () => {
    holdAudioRef.current?.play().catch(e => console.log('Sound play prevented:', e));
  };

  const playWinSound = () => {
    winAudioRef.current?.play().catch(e => console.log('Sound play prevented:', e));
  };

  const playOinkSound = () => {
    oinkAudioRef.current?.play().catch(e => console.log('Sound play prevented:', e));
  };

  return { playRollSound, playHoldSound, playWinSound, playOinkSound };
}