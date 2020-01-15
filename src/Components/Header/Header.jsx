import React, { useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";

const Header = props => {
  let iconRef = useRef();

  let [dropDown, changeDropDown] = useState(false);

  const toggleDropDown = e => {
    if (e.target !== iconRef.current) {
      changeDropDown(false);
    }
  };

  const open = () => {
    changeDropDown(true);
  };

  window.onclick = props.isLogin ? toggleDropDown : null;

  return (
    <header className="header">
      <div className="heading">
        <h1 className="heading__name">SoMedial</h1>

        {props.isLogin ? (
          <div className="heading__side">
            {dropDown ? (
              <div className="heading__dropdown" onClick={props.signOut}>
                SignOut
              </div>
            ) : null}
            <i
              onClick={open}
              ref={iconRef}
              className="fas fa-ellipsis-v heading__icon"
            ></i>
          </div>
        ) : null}
      </div>

      {props.isLogin ? <NavBar /> : null}
    </header>
  );
};

export default Header;
