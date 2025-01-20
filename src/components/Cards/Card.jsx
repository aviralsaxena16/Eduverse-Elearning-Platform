import React from 'react';

const Card = ({ title, url }) => {
  const cardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease, border 0.4s ease',
    width: '300px',
    textAlign: 'center',
    margin: '20px',
    border: '1px solid #e0e0e0',
  };

  const cardHoverStyle = {
    transform: 'translateY(-12px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid #007bff', // Subtle glow on hover
  };

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderBottom: '2px solid #f0f0f0',
  };

  const titleStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333',
    margin: '20px 15px',
    lineHeight: '1.5',
  };

  const subTextStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '15px',
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onMouseEnter={(e) =>
        Object.assign(e.currentTarget.style, { ...cardStyle, ...cardHoverStyle })
      }
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
    >
      <img src={url} alt={title} style={imgStyle} />
      <h3 style={titleStyle}>{title}</h3>
      <p style={subTextStyle}>Click to explore more</p>
    </div>
  );
};

export default Card;
