export type OkResponse<Value> = { state: "ok"; value: Value };
export type LoadingResponse = { state: "loading" };
export type ErrorResponse = { state: "error"; message: unknown };

export type FetchResponse<Value> =
  | OkResponse<Value>
  | LoadingResponse
  | ErrorResponse;

export type Location = {
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  localtime_epoch: number;
  name: string;
  region: string;
  tz_id: string;
};

export type Condition = {
  code: number;
  icon: string;
  text: string;
};

export type Search = {
  id: number;
  country: string;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

export type Weather = {
  condition: Condition;
  feelslike_c: number;
  gust_kph: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  temp_c: number;
  uv: number;
  vis_km: number;
  wind_kph: number;
  wind_dir: string;
};

export type CurrentWeather = {
  current: Weather;
  location: Location;
};

export type Astro = {
  is_moon_up: number;
  is_sun_up: number;
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
};

export type Astonomy = {
  astronomy: { astro: Astro };
  location: Location;
};

export type ForecastDay = {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  daily_chance_of_rain: number;
  condition: Condition;
  uv: number;
};

export type ForecastDayObject = {
  date: string;
  day: ForecastDay;
  astro: Astro;
};

export type Forecast = {
  location: Location;
  current: Weather;
  forecast: {
    forecastday: ForecastDayObject[];
  };
};
