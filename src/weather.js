import React from "react";

const Weather = () => {
  const [data, setData] = React.useState({});
  let [time, setTime] = React.useState([]);
  let [temp, setTemp] = React.useState([]);
  let [humidity, setHumidity] = React.useState([]);
  let [realFeel, setRealFeel] = React.useState([]);
  let [pressure, setPressure] = React.useState([]);
  let [windspeed, setWindSpeed] = React.useState([]);
  let [winddirection, setDirection] = React.useState([]);
  const [lat, setlat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const successCallback = (position) => {
    setlat(position.coords.latitude);
    setLong(position.coords.longitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  let getData = () => {
    console.log(lat, long);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,surface_pressure,windspeed_10m,winddirection_10m`
    )
      .then((res) => res.json())
      .then((response) => {
        setTime(response.hourly.time);
        setTemp(response.hourly.temperature_2m);
        setHumidity(response.hourly.relativehumidity_2m);
        setRealFeel(response.hourly.apparent_temperature);
        setPressure(response.hourly.surface_pressure);
        setWindSpeed(response.hourly.windspeed_10m);
        setDirection(response.hourly.winddirection_10m);
        // console.log(time);
        console.log(temp);
        setData(response);
      });
  };

  return (
    <div>
      <button className="btn" type="button" onClick={getData}>
        Get Weather
      </button>
      <h1>Curent Weather</h1>
      <div className="weather">
        <p>
          Location: {lat} {long}{" "}
        </p>
        <p>
          Latitude:{data.latitude}&emsp;&emsp; &emsp; Longitude:{data.longitude}
        </p>
        <p>
          TimeZone: {data.timezone}
          {"  "}
          {time.length > 0 ? time[time.length - 1] : "NA"}
        </p>
        <p>
          Temperature:{" "}
          {temp.length > 0
            ? data.hourly.temperature_2m[temp.length - 1] + "C"
            : "NA"}{" "}
        </p>
        <p>
          Humidity: {humidity.length > 0 ? humidity[humidity.length - 1] : "NA"}{" "}
        </p>
        <p>
          Real Feel:{" "}
          {realFeel.length > 0 ? realFeel[realFeel.length - 1] : "NA"}{" "}
        </p>
        <p>
          Pressure: {pressure.length > 0 ? pressure[pressure.length - 1] : "NA"}{" "}
        </p>
        <p>
          Wind Speed:{" "}
          {windspeed.length > 0
            ? windspeed[windspeed.length - 1] + "kmph"
            : "NA"}{" "}
        </p>
        <p>
          Wind Direction:{" "}
          {winddirection.length > 0
            ? winddirection[winddirection.length - 1]
            : "NA"}{" "}
        </p>
      </div>
    </div>
  );
};

export default Weather;
