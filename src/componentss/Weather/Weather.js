import React, { useCallback, useEffect, useState } from "react";
import MainCard from "../UI/MainCard";
import location from "../images/location.png";
import search from "../images/search.png";
import classes from "./weather.module.css";
import DailyCast from "../UI/DailyCast";
import GraphContainer from "../UI/GraphContainer";

import { API_KEY, API_BASE_URL } from "../apis/api.js";

//  fetch(`${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`)

const Weather = () => {
  const [city, setCity] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getWeather = async () => {
      let res = await fetch(
        `${API_BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      let resData = await res.json();
      console.log(resData);
      //   setCity(resData);
    };
    getWeather();
  }, []);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  //https://api.openweathermap.org/data/2.5/weather?q=giridih&appid=257ff530b88282b65755b59a2ebf5aca
  //https://api.openweathermap.org/data/2.5/weather/search?q=${city}&appid=${API_KEY}

  const handleChange = (value) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather/search?q=${city}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => setSuggestions(json.coord.lon));
  };

  const optimizedFn = useCallback(debounce(handleChange), []);
  console.log(suggestions);

  return (
    <MainCard>
      <div className={classes.input_container}>
        <form>
          <input
            className={classes.input_cont}
            type="text"
            placeholder="Enter Your Location..."
            onChange={(e) => optimizedFn(e.target.value)}
          />
        </form>
        <img className={classes.location_png} src={location} alt="location" />
        <img className={classes.search_png} src={search} alt="search" />
      </div>

      {suggestions.length > 0 && (
        <div className={classes.autocomplete}>
          {suggestions.map((el, i) => (
            <div key={i} className={classes.autocompleteItems}>
              <span>{el.name}</span>
            </div>
          ))}
        </div>
      )}

      <DailyCast>dfd</DailyCast>
      <GraphContainer></GraphContainer>
    </MainCard>
  );
};

export default Weather;
