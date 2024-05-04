import { useState } from "react";

export default function Home() {


  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherdata, setWeatherData] = useState([]);

  async function submitHandler (e)  {
    e.preventDefault();
    const Url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(Url);
      const data = await response.json();

      setWeatherData(data.properties.timeseries.slice(0,30));

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div id="root">
        <h1>Weather Forecast</h1>
       {console.log(weatherdata)}
        <form onSubmit={submitHandler}> 
          <label htmlFor="latitute">Latitude</label>
          <input type="text" name="latitute" className="latitude" value={lat} onChange={(e) => setLat(e.target.value)}/>
          <label htmlFor="longitude">Longitude</label>
          <input type="text" name="longitude" className="longitude" value={lon} onChange={(e) => setLon(e.target.value)}/>
          <button type="submit">Get Forecast</button>
        </form>

          <table>
                <thead>
                  <tr>
                      <th>Time</th>
                      <th>Temperature (°C)</th>
                      <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                {
                  weatherdata.map((weather)=>(
                    <tr key={weather.time}>
                        <td>{new Date(weather.time).toLocaleString()}</td>
                        <td>{weather.data.instant.details.air_temperature.toFixed(1)}</td>
                        <td>{weather.data.next_1_hours.summary.symbol_code}</td>
                    </tr>
                  ))
                }
                
                </tbody>
              </table>
          
       
      </div>
    </>
  );
}
