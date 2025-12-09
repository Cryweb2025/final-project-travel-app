interface DestinationProps {
  name: string;
  image: string;
  description: string;
}

const DestinationCard: React.FC<DestinationProps> = ({ name, image, description }) => {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", margin: "1rem" }}>
      <img src={image} alt={name} style={{ width: "100%", borderRadius: "8px" }} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default DestinationCard;
