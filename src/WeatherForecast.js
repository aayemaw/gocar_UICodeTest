import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};
const WeatherForecast = () => {
  const [ date, setDate] = useState([])
  const [ min, setMin] = useState([])
  const [ max, setMax] = useState([])

  useEffect(() => {
     const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast?latitude=27.986065&longitude=86.922623&daily=temperature_2m_min,temperature_2m_max&snowfall_sum&timezone=auto"
        );
        setDate(response.data.daily.time)      
        setMin(response.data.daily.temperature_2m_min)
        setMax(response.data.daily.temperature_2m_max)        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 style={mystyle}>Weather Forecast</h2>
      <table className="table table-bordered table-success">
       <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Temp Min(°C)</th>
            <th scope="col">Temp Max(°C)</th>
          </tr>
        </thead>
        <tbody>
          {date.map((item, index) => (
            <tr key={item}>
              <td>{index + 1}</td>
              <td>{item}</td>
              <td>{min[index]}</td>
              <td>{max[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherForecast;
