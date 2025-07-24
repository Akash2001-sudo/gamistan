import React, { useRef, useEffect, useState } from 'react';
import './FlappyBird.css';

// Easier game constants
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 48; // Slightly larger for sprite
const GRAVITY = 0.18; // Reduce gravity for slower fall
const FLAP = -6; // Reduce flap strength for gentler jump
const PIPE_WIDTH = 40; // Smaller pipes for easier passage
const PIPE_GAP = 240; // Even wider gap for easier play
const PIPE_SPEED = 1.2; // Slower pipes

function getRandomPipeY() {
  return Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 100)) + 50;
}

// Use public domain Flappy Bird sprite URLs
const BIRD_FRAMES = [
  'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-upflap.png',
  'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png',
  'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-downflap.png',
];

const FlappyBird: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([
    { x: GAME_WIDTH + 100, y: getRandomPipeY() },
    { x: GAME_WIDTH + 100 + 200, y: getRandomPipeY() },
  ]);
  const [birdFrame, setBirdFrame] = useState(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!started || gameOver) return;
    const update = () => {
      setBirdY((y) => Math.max(0, y + velocity));
      setVelocity((v) => v + GRAVITY);
      setPipes((prev) => {
        const newPipes = prev.map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
        if (newPipes[0].x < -PIPE_WIDTH) {
          newPipes.shift();
          newPipes.push({ x: GAME_WIDTH, y: getRandomPipeY() });
          setScore((s) => s + 1);
        }
        return newPipes;
      });
      requestRef.current = requestAnimationFrame(update);
    };
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [started, gameOver, velocity]);

  useEffect(() => {
    if (!started || gameOver) return;
    // Collision detection
    if (birdY + BIRD_SIZE > GAME_HEIGHT || birdY < 0) {
      setGameOver(true);
      return;
    }
    for (const pipe of pipes) {
      if (
        pipe.x < 60 + BIRD_SIZE &&
        pipe.x + PIPE_WIDTH > 60 &&
        (birdY < pipe.y || birdY + BIRD_SIZE > pipe.y + PIPE_GAP)
      ) {
        setGameOver(true);
        return;
      }
    }
  }, [birdY, pipes, started, gameOver]);

  const handleFlap = () => {
    if (!started) setStarted(true);
    if (!gameOver) setVelocity(FLAP);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setStarted(false);
    setBirdY(GAME_HEIGHT / 2 - BIRD_SIZE / 2);
    setVelocity(0);
    setPipes([
      { x: GAME_WIDTH + 100, y: getRandomPipeY() },
      { x: GAME_WIDTH + 100 + 200, y: getRandomPipeY() },
    ]);
  };

  useEffect(() => {
    const onSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlap();
      }
    };
    window.addEventListener('keydown', onSpace);
    return () => window.removeEventListener('keydown', onSpace);
  });

  // Animate bird wings
  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      setBirdFrame((f) => (f + 1) % BIRD_FRAMES.length);
    }, 120);
    return () => clearInterval(interval);
  }, [started, gameOver]);

  return (
    <div className="flappy-container">
      <div className="flappy-game" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }} onClick={handleFlap} tabIndex={0}>
        {/* Bird with animated sprite */}
        <img
          src={BIRD_FRAMES[birdFrame]}
          alt="Flappy Bird"
          className="bird"
          style={{ top: birdY, left: 60, width: BIRD_SIZE, height: BIRD_SIZE, position: 'absolute', pointerEvents: 'none' }}
        />
        {/* Pipes */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            <div
              className="pipe pipe-top"
              style={{ left: pipe.x, height: pipe.y, width: PIPE_WIDTH }}
            />
            <div
              className="pipe pipe-bottom"
              style={{ left: pipe.x, top: pipe.y + PIPE_GAP, height: GAME_HEIGHT - (pipe.y + PIPE_GAP), width: PIPE_WIDTH }}
            />
          </React.Fragment>
        ))}
        {/* Score */}
        <div className="score">{score}</div>
        {/* Overlay */}
        {!started && !gameOver && (
          <div className="flappy-start-overlay">
            <div className="flappy-start-card">
              <img src={BIRD_FRAMES[1]} alt="Flappy Bird" style={{ width: 64, height: 64, marginBottom: 16 }} />
              <h2 className="flappy-title">Flappy Bird</h2>
              <p className="flappy-instructions">Click or press <span className="flappy-key">Space</span> to start</p>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="overlay">
            <div>Game Over</div>
            <div>Score: {score}</div>
            <button onClick={handleRestart}>Restart</button>
            {onExit && <button onClick={onExit} style={{ marginLeft: 8 }}>Exit</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlappyBird;
