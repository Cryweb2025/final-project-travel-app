import { useEffect, useState } from "react";
import styles from "./WeatherSection.module.css";

type Props = {
  city: string;
};

type WeatherData = {
  temp: number;
  description: string;
};

function WeatherSection({ city }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3603bb385cba1812ea388450e7b58c94`
  )
    .then((res) => res.json()) 
    .then((data) => {
      if (data.main && data.weather) {
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
      }
      setLoading(false);
    });
}, [city]);


  if (loading) {
    return <div className={styles.card}>Loading weather...</div>;
  }

  return (
    <div className={styles.card}>
      <p className={styles.title}>Weather</p>
      <p className={styles.text}>City: {city}</p>
      <p className={styles.text}>
        {Math.round(weather!.temp)}°C • {weather!.description}
      </p>
    </div>
  );
}

export default WeatherSection;

