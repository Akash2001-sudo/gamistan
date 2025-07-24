import React from 'react';
import './GamesSection.css';

interface GamesSectionProps {
  onSelectGame: (game: string) => void;
}

const games = [
  {
    key: 'flappy',
    name: 'Flappy Bird',
    description: 'Classic tap-to-fly game. Avoid the pipes and beat your high score!',
    logo: 'https://raw.githubusercontent.com/sourabhv/FlapPyBird/master/assets/sprites/yellowbird-midflap.png',
  },
  // Add more games here in the future
];

const GamesSection: React.FC<GamesSectionProps> = ({ onSelectGame }) => (
  <section className="games-section">
    <h2 className="games-title">Choose a Game</h2>
    <div className="games-list">
      {games.map((game) => (
        <button
          key={game.key}
          className="game-card"
          onClick={() => onSelectGame(game.key)}
          aria-label={`Play ${game.name}`}
        >
          <img src={game.logo} alt={`${game.name} logo`} className="game-logo" />
          <div className="game-name">{game.name}</div>
          <div className="game-desc">{game.description}</div>
        </button>
      ))}
      {/* Placeholder for more games */}
      <div className="game-card game-coming-soon" aria-disabled="true">
        <div className="game-name">More Games Coming Soon</div>
      </div>
    </div>
  </section>
);

export default GamesSection;
