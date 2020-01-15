import React from "react";

const Backdrop = props => {
  return <div onClick={props.close} className="backdrop"></div>;
};

export default Backdrop;
