import React from "react";
import classes from "./graph.module.css";
const GraphContainer = ({ children }) => {
  return <div className={classes.graph_container}>{children}</div>;
};

export default GraphContainer;
