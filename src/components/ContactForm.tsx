import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setEmail('');
    setMessage('');
  };

  return (
    <section className="contact" id="contact">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          aria-label="Message"
          required
        />
        <button type="submit">Send</button>
        {error && <div className="form-error" role="alert">{error}</div>}
        {submitted && <div className="form-success" role="status">Message sent!</div>}
      </form>
    </section>
  );
};

export default ContactForm;
