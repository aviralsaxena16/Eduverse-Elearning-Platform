import './Cards.css'
const Card = ({ title, url, id }) => {
  return (
    <div className="card">
      <img src={url} alt={title} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-subtitle">Click to explore more</p>
      </div>
    </div>
  );
};

export default Card;
