import styles from "./CountryInfoData.module.css"

export interface CountryInfo {
    id: string;
    name:string;
    description:string;
    heroVideo: string;
    capital:string;

}

export const countryInfoData :  CountryInfo [] = [
    {
        id: "japan",
        name: "Japan",
        description: "Japan isn’t just a place — it’s a feeling. Neon reflections, ancient temples, quiet streets and ramen steam that warms more than just your hands. Once you arrive, you understand why people always return.",
        heroVideo: "/videos/Japan.mp4",
        capital: "Tokyo"
    },
    {
        id: "uae",
        name: "United Arab Emirates",
        description: "Luxury tourism and desert",
        heroVideo: "",
        capital: ""
    }
]