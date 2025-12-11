export interface WeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  name: string;
}
