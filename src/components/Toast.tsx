import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info' }) => (
  <div
    style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: type === 'success' ? '#388e3c' : type === 'error' ? '#d32f2f' : '#222',
      color: '#fff',
      padding: '0.75rem 2rem',
      borderRadius: 8,
      fontSize: '1rem',
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      minWidth: 200,
      textAlign: 'center',
    }}
    role="status"
    aria-live="polite"
  >
    {message}
  </div>
);

export default Toast;
