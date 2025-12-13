import { useParams } from "react-router-dom";
import { countryInfoData } from "./data/CountryInfoData";
import { HeroVideo } from "./countryComponents/HeroVideo/HeroVideo";
import WeatherSection from "./countryComponents/WeatherSection/WeatherSection";
import CurrencySection from "./countryComponents/CurrencySection/CurrencySection";
import styles from "./CountryInfoPage.module.css";

export const CountryInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const country = countryInfoData.find((c) => c.id === id);

  if (!country) {
    return <h1>Country not found</h1>;
  }

  return (
    <div className={styles.page}>
      <HeroVideo videoSrc={country.heroVideo} title={country.name} />

      <section className={styles.textIntro}>
        <h1 className={styles.countryTitle}>{country.name}</h1>

        <p className={styles.subtitle}>{country.subtitle}</p>

        <p className={styles.countryDescription}>{country.description}</p>
      </section>

      <section className={styles.introSection}>
        <img
          src={country.image}
          alt={country.name}
          className={styles.introImage}
        />

        <div className={styles.introText}>
          <p>{country.imageText}</p>
        </div>
      </section>

      <div className={styles.weatherCurrencyCard}>
        <WeatherSection city={country.capital} />
        <CurrencySection currency={country.currency} />
      </div>

      <section className={styles.foodSection}>
        <h2>Food</h2>
        <p>{country.food}</p>
      </section>
    </div>
  );
};
