import React from "react";

import classes from "./dailycast.module.css";

const DailyCast = (props) => {
  return (
    <div className={`${classes.daily_cast} ${props.className}`}>
      {props.children}
    </div>
  );
};

export default DailyCast;
