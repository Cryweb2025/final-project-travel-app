
import i18n from "../../../../i18n";
import { useGetWeatherQuery } from "../../../../services/api/weatherApi";
import styles from "./WeatherSection.module.css";



type Props = {
  city: string;
};


function WeatherSection({ city }: Props) {
 const { data, isLoading, isError } = useGetWeatherQuery({
  city,
  lang: i18n.language,
});


  if (isLoading) {
    return <div className={styles.card}>Loading weather...</div>;
  }

  if (isError || !data) {
    return <div className={styles.card}>No weather data</div>;
  }
  const description = data.weather[0].description.toLowerCase();

const weatherIcon =
  description.includes("rain") ? "🌧️" :
  description.includes("cloud") ? "☁️" :
  description.includes("clear") ? "☀️" :
  description.includes("snow") ? "❄️" :
  "🌡️";
  return (
    <div className={styles.card}>
      <p className={styles.title}> Weather</p>
      <p className={styles.text}>City: {city}</p>
      <p className={styles.text}> {weatherIcon}
        {Math.round(data.main.temp)}°C • {data.weather[0].description}
      </p>
    </div>
  );
}

export default WeatherSection;
