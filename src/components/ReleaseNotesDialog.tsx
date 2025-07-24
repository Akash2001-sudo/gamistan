import React from 'react';
import './ReleaseNotesDialog.css';

interface ReleaseNotesDialogProps {
  open: boolean;
  onClose: () => void;
}

const notes = [
  '🎮 Welcome to Gamistan! Now featuring a beautiful Games menu and Flappy Bird.',
  '✨ Modern, minimal UI and improved accessibility.',
  '🕹️ More games coming soon!',
  'bugfix: Improved interaaction with game controls for flappy bird.',
];

const ReleaseNotesDialog: React.FC<ReleaseNotesDialogProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="release-notes-backdrop">
      <div className="release-notes-dialog" role="dialog" aria-modal="true" aria-label="Release Notes">
        <h3 className="release-notes-title">Release Notes</h3>
        <ul className="release-notes-list">
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReleaseNotesDialog;
