import { useParams } from "react-router-dom";
import { countryInfoData } from "./data/CountryInfoData";
import { HeroVideo } from "./components/HeroVideo";

export const CountryInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const country = countryInfoData.find((c) => c.id === id);

  if (!country) {
    return <h1>Country not found</h1>;
  }

  return (
    <div>
        <HeroVideo videoSrc={country.heroVideo} title={country.name}/>
      <h1>{country.name}</h1>
      <p>{country.description}</p>
    </div>
  );
};
