


import axios from "axios";
import { useEffect, useState } from "react";
import { Droplets, Thermometer, Wind } from "lucide-react";

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [city, setCity] = useState("Jakarta");
  const [data, setData] = useState({});

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">
      <input
        type="text"
        placeholder="Masukan kota"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="mb-6 p-2 rounded-lg border w-full max-w-md text-center border-blue-400"
      />

      {data.name ? (
        <div className="  rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-2">
            {data.name}, {data?.sys?.country}
          </h2>

          {data.weather && data.weather[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0]?.description}
              className="mx-auto"
            />
          )}

          <p className="text-3xl font-bold">{data.main?.temp}°C</p>
          <p className="capitalize text-lg mb-4">{data.weather?.[0]?.description}</p>

          <div className="flex justify-center items-center gap-4 text-sm text-left pt-10">
            <div className="flex items-center gap-2">
              <Thermometer size={18} /> Feels like: {data.main?.feels_like}°C
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={18} /> Humidity: {data.main?.humidity}%
            </div>
            <div className="flex items-center gap-2">
              <Wind size={18} /> Wind: {data.wind?.speed} m/s
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
