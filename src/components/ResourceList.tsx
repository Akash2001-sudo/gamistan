import React from 'react';
import './ResourceList.css';

const resources = [
  { title: 'React Docs', url: 'https://react.dev/' },
  { title: 'Vitest', url: 'https://vitest.dev/' },
  { title: 'Testing Library', url: 'https://testing-library.com/' },
];

const ResourceList: React.FC = () => (
  <section className="resources" id="resources">
    <h2>Resources</h2>
    <ul className="resource-list">
      {resources.map((r) => (
        <li key={r.url} className="resource-item">
          <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
        </li>
      ))}
    </ul>
  </section>
);

export default ResourceList;
