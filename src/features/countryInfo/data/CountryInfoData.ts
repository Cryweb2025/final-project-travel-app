

export interface CountryInfo {
    id: string;
    name:string;
    description:string;
    heroVideo: string;

}

export const countryInfoData :  CountryInfo [] = [
    {
        id: "japan",
        name: "Japan",
        description: "Land of the Rising Sun with temples and sakura",
        heroVideo: "/videos/Japan.mp4"
    },
    {
        id: "uae",
        name: "United Arab Emirates",
        description: "Luxury tourism and desert",
        heroVideo: ""
    }
]