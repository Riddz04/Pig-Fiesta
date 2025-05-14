import { useState } from 'react';
import PigFiesta from './components/PigFiesta';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      {!gameStarted ? (
        <div className="min-h-screen flex items-center justify-center flex-col">
          <h1 className="text-4xl md:text-6xl mb-8 font-bold tracking-wider text-pink-600 drop-shadow-lg">
            🐷 Pig Fiesta 🎉
          </h1>
          <button 
            onClick={() => setGameStarted(true)}
            className="bg-pink-500 text-white text-xl py-4 px-12 rounded-full shadow-lg hover:bg-pink-600 transition-all"
          >
            Start Game
          </button>
        </div>
      ) : (
        <PigFiesta />
      )}
    </div>
  );
}

export default App;