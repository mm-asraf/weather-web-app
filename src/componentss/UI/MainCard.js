import React from "react";
import classes from "./mainCard.module.css";
const MainCard = (props) => {
  return <div className={`${classes.main_card}`}>{props.children}</div>;
};

export default MainCard;
