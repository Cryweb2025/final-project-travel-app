import { useGetWeatherQuery } from "../services/weatherApi";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  name: string;
  image: string;
  city: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  image,
  city,
}) => {
  const { data, isLoading, error } = useGetWeatherQuery(city);

  return (
    <div style={{ width: "250px", margin: "1rem", textAlign: "center" }}>
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          borderRadius: "8px",
          height: "150px",
          objectFit: "cover",
        }}
      />
      <h3>{name}</h3>

      {isLoading && <p>⏳ Wetter wird geladen...</p>}
      {error && <p>❌ Fehler beim Laden des Wetters</p>}
      {data && (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            style={{ width: "50px", height: "50px" }}
          />
          <p>
            🌡️ {Math.round(data.main.temp)}°C • {data.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;
