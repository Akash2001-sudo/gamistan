import React from 'react';

const Seo: React.FC<{ title: string; description?: string }> = ({ title, description }) => {
  React.useEffect(() => {
    document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
  return null;
};

export default Seo;
