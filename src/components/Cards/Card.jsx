
const Card = ( title, url ) => {
  const cardStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '280px',
    textAlign: 'center',
    margin: '20px',
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',
  };

  const imgStyle = {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderBottom: '2px solid #f0f0f0',
  };

  const titleStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.2rem',
    color: '#333',
    margin: '15px 0',
  };

  return (
    <div 
      className="card" 
      style={cardStyle} 
      onMouseEnter={(e) => e.currentTarget.style = { ...cardStyle, ...cardHoverStyle }}
      onMouseLeave={(e) => e.currentTarget.style = cardStyle}
    >
      <img src={url} alt={title} style={imgStyle} />
      <h3 style={titleStyle}>{title}</h3>
    </div>
  );
};

export default Card;
