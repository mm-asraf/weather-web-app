import React, { useEffect, useState } from "react";
import rainy from "../Images/rainy.png";
import sunny from "../Images/sunny.png";
import location from "../Images/location.png";
import cloudy from "../Images/cloudy.png";
import Search from "../Images/search.png";
import Chart1 from "../chart/Chart1";
import Chart2 from "../chart/Chart2";
import { JsonData } from "../apis/DataJson";
import { API_KEY, API_BASE_URL } from "../apis/api.js";
import MainCard from "../UI/MainCard";
import DailyCast from "../UI/DailyCast";
import GraphContainer2 from "../UI/GraphContainer2";
import classes from "../Weather/weather.module.css";

const Weathers = () => {
  const [arraylist, setarraylist] = useState([]);
  const [list, setList] = useState([]);
  const [city, setCity] = useState("");
  const [temparr, setTemparr] = useState([]);
  const [search, setSearch] = useState([]);
  const [wordEnter, setWordEnter] = useState("");

  const [value, setValue] = useState("");

  const showPosition = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => getWeather(data.coord.lon, data.coord.lat))
      .catch((err) => console.log(err));
  };

  const getWeather = (lon, lat) => {
    fetch(
      `${API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => show(data))
      .catch((err) => console.log(err));
  };

  const currCityWeather = (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeather(lon, lat);
  };
  const show = (data) => {
    setarraylist(data.daily);
    // console.log(data);
    setList(data.current);
    let array = [];
    for (let i = 0; i < 24; i++) {
      array.push(data.hourly[i].temp);
    }
    setTemparr(array);
  };

  // console.log(list);
  // console.log(arraylist);
  console.log(temparr);
  const getLocation = (e) => {
    setCity(e.target.value);
    setValue(e.target.value);

    const searchWord = e.target.value;
    setWordEnter(searchWord);
    const newFilter = JsonData.filter((value) => {
      const input = value.name.toLowerCase().includes(searchWord.toLowerCase());
      return input;
    });
    if (searchWord === "") {
      setSearch([]);
    } else {
      setSearch(newFilter);
    }

    // showPosition()
  };

  const onSearch = (searchWord) => {
    setValue(searchWord);
  };
  const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currCityWeather);
    } else {
      console.log("NS");
    }
  };

  useEffect(() => {
    getlocation();
  }, []);

  return (
    <MainCard className="outer-container">
      <DailyCast className="inner-container1">
        <form onSubmit={showPosition}>
          <input
            className="inputBox"
            type="text"
            placeholder="search"
            value={value}
            onChange={getLocation}
          />
        </form>
        <img className="LocationImg" src={location} alt="location" />
        <img className="SearchImg" src={Search} alt="searchImg" />
      </DailyCast>
      {search.length != 0 && (
        <div className="citybox">
          {search.map((value, key) => {
            return (
              <div className={classes.autocomplete}>
                <div
                  className={classes.autocompleteItems}
                  onClick={() => onSearch(`${value.name}, ${value.state}`)}
                >{`${value.name}, ${value.state}`}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className="inner-container2">
        {arraylist?.map((e, i) => {
          console.log(e.dt);
          const dateTimeStr = new Date(e.dt * 1000)
            .toLocaleString("en-US", { weekday: "long" })
            .slice(0, 3);
          return (
            <div key={i} className="Weather_8days">
              <div className="Weatherdetails">
                <p className="weekdays">{dateTimeStr}</p>
                <span className="span maxtemp">
                  {e.temp.max.toFixed()}&deg;
                </span>
                <span className="span mintemp">
                  {e.temp.min.toFixed()}&deg;
                </span>
              </div>
              <div className="image_div">
                <img
                  className="image"
                  src={
                    e.weather[0].main === "Clear"
                      ? sunny
                      : e.weather[0].main === "Rain"
                      ? rainy
                      : cloudy
                  }
                  alt="weather_png"
                />
                <p className="Weather_status">{e.weather[0].main}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="inner-container3">
        <div className="TempInfo">
          <span className="temp1">{Math.floor(list.temp)}°C</span>
          <span>
            <img className="tempimg" src={cloudy} alt="" />
          </span>
        </div>
        <Chart1 array={temparr} />
        <div className="pressurehumidity">
          <div className="pressure">
            <p className="p1">
              <span>Pressure</span> <br />
              {list.pressure} hpa
            </p>
          </div>
          <div className="humidity">
            <p className="p1">
              <spana>Humidity</spana> <br /> {list.humidity}%
            </p>
          </div>
        </div>
        <div className="last">
          <div className="sunrisesunset">
            <div>
              <p className="sunrise">
                <span>Sunrise</span> <br />
                {new Date(list.sunrise * 1000).toLocaleString().slice(10, 14)}am
              </p>
            </div>
            <div>
              <p className="sunset">
                <spana>Sunset</spana> <br />
                {new Date(list.sunset * 1000).toLocaleString().slice(10, 14)}pm
              </p>
            </div>
          </div>
        </div>
        <Chart2 />
      </div>
    </MainCard>
  );
};

export default Weathers;
