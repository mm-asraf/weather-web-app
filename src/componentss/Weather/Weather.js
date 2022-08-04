import React from "react";
import MainCard from "../UI/MainCard";
import location from "../images/location.png";
import search from "../images/search.png";
import classes from "./weather.module.css";
const Weather = () => {
  return (
    <MainCard>
      <div className={classes.input_container}>
        <form>
          <input
            className={classes.input_cont}
            type="text"
            placeholder="Enter Your Location..."
          />
        </form>
        <img className={classes.location_png} src={location} alt="location" />
        <img className={classes.search_png} src={search} alt="search" />
      </div>
    </MainCard>
  );
};

export default Weather;