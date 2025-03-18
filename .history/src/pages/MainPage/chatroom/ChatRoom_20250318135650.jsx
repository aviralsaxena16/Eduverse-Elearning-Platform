import React from 'react';

const ChatRoom = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>ChatRoom Coming soon!</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #ffffff, #5b4bc9)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  content: {
    padding: '20px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  },
};

export default ChatRoom;
