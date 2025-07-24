# Copilot Coding Style and Best Practices

This document provides coding style guidelines and best practices for using GitHub Copilot in this project.

## General Principles
- **Write clean, readable code**: Prioritize clarity and maintainability over cleverness.
- **Use meaningful names**: Name variables, functions, and components descriptively.
- **Keep functions small**: Each function should do one thing and do it well.
- **Comment when necessary**: Use comments to explain complex logic, not obvious code.
- **Prefer functional components**: Use React functional components and hooks.
- **Consistent formatting**: Use Prettier or your team's formatting rules.

## React/TypeScript Best Practices
- Use TypeScript for type safety. Always type props and state.
- Use ES6+ features (arrow functions, destructuring, etc.).
- Use CSS modules or scoped CSS for component styles.
- Keep components focused; split large components into smaller ones.
- Use semantic HTML elements (e.g., `<header>`, `<nav>`, `<main>`, `<footer>`).
- Avoid inline styles; use CSS classes instead.

## Project-Specific Conventions
- Use PascalCase for component names and camelCase for variables/functions.
- Place each component in its own folder with related CSS and test files.
- Export only one component per file.

## Code Review Checklist
- [ ] Is the code readable and maintainable?
- [ ] Are all variables and functions clearly named?
- [ ] Are there sufficient comments for complex logic?
- [ ] Does the code follow our formatting and style rules?
- [ ] Are all Copilot suggestions reviewed and edited as needed?
- [ ] Are there tests for new or changed functionality?

## Accessibility Best Practices
- Use semantic HTML and ARIA attributes where appropriate.
- Ensure all interactive elements are keyboard accessible.
- Provide alt text for images and labels for form fields.

## Testing Guidelines
- Write unit tests for all components and utilities.
- Use React Testing Library for component tests.
- Mock external dependencies in tests.

## Security Considerations
- Never commit secrets or credentials.
- Sanitize all user input and output.
- Avoid using `dangerouslySetInnerHTML` unless necessary and safe.

## Copilot Usage Tips
- Review Copilot suggestions before accepting.
- Edit and refactor Copilot code to match project style.
- Add type annotations to Copilot-generated code.
- Use Copilot for boilerplate, but write business logic yourself.
- If Copilot generates unclear code, rewrite for clarity.

## Example: Header Component
```tsx
import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/resources" className="nav-link">Resources</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

---

Follow these guidelines to ensure code quality and consistency when using Copilot in this project.
