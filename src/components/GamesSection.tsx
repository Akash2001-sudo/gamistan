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
  {
    key: 'trex',
    name: 'T-Rex Runner',
    description: 'Jump over cacti and survive as long as you can in this Chrome dino classic!',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Dino_Chrome_sprite.png',
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
          <div className="game-name" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {game.name}
            {game.key === 'trex' && (
              <span className="game-superfix-beta" style={{
                background: '#ff9800',
                color: '#fff',
                fontSize: '0.7em',
                fontWeight: 600,
                borderRadius: '4px',
                padding: '2px 6px',
                marginLeft: 6
              }}>BETA</span>
            )}
          </div>
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
