import DestinationCard from "../components/DestinationCard";

const Destinations: React.FC = () => {
  const destinations = [
    {
      name: "Bali",
      image: "https://source.unsplash.com/600x400/?bali,beach",
      description: "Tropical paradise with stunning beaches, temples, and vibrant culture."
    },
    {
      name: "Paris",
      image: "https://source.unsplash.com/600x400/?paris,eiffel",
      description: "The city of love, famous for the Eiffel Tower and world-class cuisine."
    },
    {
      name: "New York",
      image: "https://source.unsplash.com/600x400/?newyork,city",
      description: "The city that never sleeps, full of skyscrapers, Broadway, and Central Park."
    }
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Popular Destinations ✈️</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {destinations.map((dest, index) => (
          <DestinationCard
            key={index}
            name={dest.name}
            image={dest.image}
            description={dest.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Destinations;
