// src/components/ContactForm/DestinationCard.tsx
import React from "react";
import { useGetWeatherQuery } from "../services/weaterApi";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  name: string;
  image: string;
  city: string;
  keyName: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  image,
  city,
  keyName,
}) => {
  const { data, isLoading, error } = useGetWeatherQuery(city);

  return (
    <Link
      to={`/destination/${keyName}`}
      className="transform transition-transform hover:scale-105 inline-block m-4 text-center w-64"
    >
      <div className="bg-yellow-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>

          {isLoading && (
            <p className="text-sm text-gray-600">⏳ Loading weather...</p>
          )}
          {error && (
            <p className="text-sm text-red-500">❌ Failed to load weather</p>
          )}
          {data && (
            <div className="flex flex-col items-center gap-1">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-12 h-12"
              />
              <p className="text-sm font-medium">
                🌡️ {Math.round(data.main.temp)}°C •{" "}
                {data.weather[0].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
