const Card = ({ children, cardClass }) => {
  return <div className={`card ${cardClass}`}>{children}</div>;
};

export default Card;
