import React, { useState, useEffect } from "react";
import "./MessageBar.css"; // Add styles for the bar here

const MessageBar = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`message-bar ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default MessageBar;
