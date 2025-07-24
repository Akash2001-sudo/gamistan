import React, { useEffect, useRef, useState } from 'react';
import './TRexRunner.css';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 180;
const TREX_WIDTH = 44;
const TREX_HEIGHT = 48;
const GROUND_HEIGHT = 24;
const OBSTACLE_WIDTH = 18;
const OBSTACLE_HEIGHT = 36;
const JUMP_VELOCITY = -9;
const GRAVITY = 0.5;
const OBSTACLE_SPEED = 6;

interface TRexRunnerProps {
  onExit?: () => void;
}

const TRexRunner: React.FC<TRexRunnerProps> = ({ onExit }) => {
  const [trexY, setTrexY] = useState(GAME_HEIGHT - GROUND_HEIGHT - TREX_HEIGHT);
  const [velocity, setVelocity] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<{ x: number }[]>([{ x: GAME_WIDTH + 100 }]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Handle jump
  const jump = () => {
    if (!isJumping && !gameOver) {
      setVelocity(JUMP_VELOCITY);
      setIsJumping(true);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !gameOver) {
        jump();
      }
      if (e.code === 'Escape' && onExit) {
        onExit();
      }
      if (gameOver && (e.code === 'Space' || e.code === 'ArrowUp')) {
        restart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // jump is stable and does not need to be in deps
  }, [isJumping, gameOver, onExit]);

  // Main game loop
  useEffect(() => {
    if (gameOver) return;
    let lastScoreTime = performance.now();
    function loop(now: number) {
      setTrexY(prevY => {
        const nextY = prevY + velocity;
        if (nextY >= GAME_HEIGHT - GROUND_HEIGHT - TREX_HEIGHT) {
          setIsJumping(false);
          setVelocity(0);
          return GAME_HEIGHT - GROUND_HEIGHT - TREX_HEIGHT;
        } else {
          setVelocity(v => v + GRAVITY);
          return nextY;
        }
      });
      setObstacles(prevObs => {
        let newObs = prevObs.map(o => ({ x: o.x - OBSTACLE_SPEED }));
        if (newObs.length === 0 || newObs[newObs.length - 1].x < GAME_WIDTH - 200) {
          newObs.push({ x: GAME_WIDTH + Math.random() * 100 });
        }
        newObs = newObs.filter(o => o.x + OBSTACLE_WIDTH > 0);
        return newObs;
      });
      // Throttle score increment to about every 100ms
      if (now - lastScoreTime > 100 && !gameOver) {
        setScore(s => s + 1);
        lastScoreTime = now;
      }
      // Collision detection
      const trexBottom = trexY + TREX_HEIGHT;
      const trexLeft = 60;
      const trexRight = 60 + TREX_WIDTH;
      for (const obs of obstacles) {
        const obsLeft = obs.x;
        const obsRight = obs.x + OBSTACLE_WIDTH;
        const obsTop = GAME_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT;
        if (
          trexRight > obsLeft &&
          trexLeft < obsRight &&
          trexBottom > obsTop
        ) {
          setGameOver(true);
          break;
        }
      }
      if (!gameOver) animationRef.current = requestAnimationFrame(loop);
    }
    animationRef.current = requestAnimationFrame(loop);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [gameOver, velocity, obstacles, trexY]);

  function restart() {
    setTrexY(GAME_HEIGHT - GROUND_HEIGHT - TREX_HEIGHT);
    setVelocity(0);
    setIsJumping(false);
    setObstacles([{ x: GAME_WIDTH + 100 }]);
    setScore(0);
    setGameOver(false);
  }

  return (
    <div className="trex-container">
      <div
        className="trex-game"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        tabIndex={0}
        aria-label="T-Rex Runner Game"
        onClick={jump}
      >
        {/* T-Rex */}
        <div
          className="trex"
          style={{ left: 60, top: trexY, width: TREX_WIDTH, height: TREX_HEIGHT }}
          aria-label="T-Rex"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Dino_Chrome_sprite.png"
            alt="T-Rex"
            style={{ width: '100%', height: '100%', pointerEvents: 'none', userSelect: 'none' }}
            draggable={false}
          />
        </div>
        {/* Obstacles */}
        {obstacles.map((obs, i) => (
          <div
            key={i}
            className="trex-obstacle"
            style={{ left: obs.x, top: GAME_HEIGHT - GROUND_HEIGHT - OBSTACLE_HEIGHT, width: OBSTACLE_WIDTH, height: OBSTACLE_HEIGHT }}
            aria-label="Cactus"
          />
        ))}
        {/* Ground */}
        <div className="trex-ground" style={{ top: GAME_HEIGHT - GROUND_HEIGHT, width: GAME_WIDTH }} />
        {/* Score */}
        <div className="trex-score">{score}</div>
        {/* Game Over */}
        {gameOver && (
          <div className="trex-overlay">
            <div>Game Over</div>
            <div>Score: {score}</div>
            <button onClick={restart}>Restart</button>
            {onExit && <button onClick={onExit} style={{ marginLeft: 8 }}>Exit</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TRexRunner;
