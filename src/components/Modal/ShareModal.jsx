// ShareModal.js
import React from 'react';

const ShareModal = ({ isOpen, onRequestClose }) => {
  const currentUrl = window.location.href;

  const shareOnMessenger = () => {
    const messengerShareUrl = `fb-messenger://share?link=${encodeURIComponent(currentUrl)}`;
    window.open(messengerShareUrl, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div>
      <h2>Share this link</h2>
      <button onClick={copyToClipboard}>Copy Link</button>
      <button onClick={onRequestClose}>Close</button>
    </div>
  );
};

export default ShareModal;
