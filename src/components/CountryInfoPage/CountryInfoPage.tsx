import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { countryInfoData } from "../../services/data/CountryInfoData";
import { HeroVideo } from "./countryComponents/HeroVideo/HeroVideo";
import WeatherSection from "./countryComponents/WeatherSection/WeatherSection";
import CurrencySection from "./countryComponents/CurrencySection/CurrencySection";

import styles from "./CountryInfoPage.module.css";

export const CountryInfoPage = () => {
  // Берётся id из URL: /countries/:id
  const { id } = useParams<{ id: string }>();

  // i18n
  const { t } = useTranslation();

  // Нормализация ключа (защита от Japan vs japan)
  const normalizedKey = (id || "").toLowerCase();

  // Поиск страны по id
  const country = countryInfoData.find(
    (c) => (c.id || "").toLowerCase() === normalizedKey
  );

  // Состояние видимости кнопки "Наверх"
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ссылка на реальный скролл-контейнер (window или любой overflow-container)
  const lastScrollElRef = useRef<HTMLElement | Document>(document);

  useEffect(() => {
    // Обработчик скролла (ловит скролл любого элемента через capture)
    const onScroll = (e: Event) => {
      const target = e.target as Document | HTMLElement;

      // Запоминается последний элемент, который реально скроллится
      lastScrollElRef.current = target;

      let y = 0;

      // Если скроллится документ
      if (target === document) {
        const se = document.scrollingElement || document.documentElement;
        y = se?.scrollTop || 0;
      } else {
        // Если скроллится контейнер (overflow: auto/scroll)
        y = (target as HTMLElement).scrollTop || 0;
      }

      setShowScrollTop(y > 120);
    };

    // capture:true — важно, потому что scroll не всплывает
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });

    // Первичная проверка (если уже не вверху)
    const se = document.scrollingElement || document.documentElement;
    setShowScrollTop((se?.scrollTop || 0) > 150);

    return () => {
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  // Прокрутка наверх именно того контейнера, который скроллился
  const handleScrollTop = () => {
    const el = lastScrollElRef.current;

    if (el === document) {
      const se = document.scrollingElement || document.documentElement;
      se?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    (el as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!country) {
    return <h1>{t("countries.not_found")}</h1>;
  }

  return (
    <div className={styles.page}>
      <HeroVideo
        videoSrc={country.heroVideo}
        title={t(`countries.${country.id}.name`, {
          defaultValue: country.name,
        })}
      />

      <section className={styles.textIntro}>
        <h1 className={styles.countryTitle}>
          {t(`countries.${country.id}.name`, { defaultValue: country.name })}
        </h1>

        <p className={styles.countrySubtitle}>
          {t(`countries.${country.id}.subtitle`, {
            defaultValue: country.subtitle,
          })}
        </p>

        <p className={styles.countryDescription}>
          {t(`countries.${country.id}.description`, {
            defaultValue: country.description,
          })}
        </p>
      </section>

      <section className={styles.introSection}>
        <div className={styles.introImageWrapper}>
          <img
            src={country.image}
            alt={t(`countries.${country.id}.name`, {
              defaultValue: country.name,
            })}
            className={styles.introImage}
          />
        </div>

        <div className={styles.introText}>
          <p>
            {t(`countries.${country.id}.imageText`, {
              defaultValue: country.imageText,
            })}
          </p>
        </div>
      </section>

      <div className={styles.weatherCurrencyCard}>
        <WeatherSection city={country.capital} />
        <CurrencySection currency={country.currency} />
      </div>

      <section className={styles.foodLifestyleSection}>
        <h2 className={styles.foodTitle}>{t("countries.food_title")}</h2>
        <p className={styles.foodLifestyleText}>
          {t(`countries.${country.id}.foodAndLifeStyle`, {
            defaultValue: country.foodAndLifeStyle,
          })}
        </p>
      </section>

      <section className={styles.placesSection}>
        <h2 className={styles.sectionTitle}>
          {t("countries.highlights_title")}
        </h2>

        <div className={styles.placesGrid}>
          {country.places.map((place) => (
            <div key={place.name} className={styles.placeCard}>
              <img src={place.image} alt={place.name} />
              <p className={styles.placeName}>
                {t(
                  `countries.${country.id}.places.${place.name
                    .toLowerCase()
                    .replace(/\s+/g, "_")}`,
                  { defaultValue: place.name }
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        className={`${styles.scrollTopBtn} ${
          showScrollTop ? styles.scrollTopBtnVisible : ""
        }`}
        onClick={handleScrollTop}
        aria-label="Scroll to top"
        title="Up"
      >
        ↑
      </button>
    </div>
  );
};
