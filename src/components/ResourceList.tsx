import React from 'react';
import './ResourceList.css';

const resources = [
  { title: 'How to Play Flappy Bird', url: 'https://flappybird.io/' },
  { title: 'History of Flappy Bird', url: 'https://en.wikipedia.org/wiki/Flappy_Bird' },
  { title: 'React (for Developers)', url: 'https://react.dev/' },
  { title: 'More Free Web Games', url: 'https://www.crazygames.com/' },
];

const ResourceList: React.FC = () => (
  <section className="resources" id="resources">
    <h2>Game Resources</h2>
    <ul className="resource-list">
      {resources.map((r) => (
        <li key={r.url} className="resource-item">
          <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
        </li>
      ))}
    </ul>
    <p className="resource-note">Explore these links to learn more about the games, their history, and how to play. More games and resources coming soon!</p>
  </section>
);

export default ResourceList;
