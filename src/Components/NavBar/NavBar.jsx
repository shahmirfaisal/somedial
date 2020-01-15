import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import NavContext from "../../Context/NavContext";

const NavBar = () => {
  let context = useContext(NavContext);

  return (
    <nav className="nav">
      <NavLink className="nav-link" activeClassName="active-link" to="/home">
        <div className="nav__item">
          <i className="fas fa-home nav__icon"></i>
          <p className="nav__text">Home</p>
        </div>
      </NavLink>

      <NavLink className="nav-link" activeClassName="active-link" to="/profile">
        <div
          className="nav__item"
          onClick={() => context.fetchProfileData(context.email)}
        >
          <i className="far fa-user-circle nav__icon"></i>
          <p className="nav__text">Profile</p>
        </div>
      </NavLink>

      <NavLink
        className="nav-link"
        activeClassName="active-link"
        to="/notifications"
      >
        <div className="nav__item">
          <i className="far fa-bell nav__icon"></i>
          <p className="nav__text">Notifications</p>
        </div>
      </NavLink>

      <div className="nav__item" onClick={context.showUploadPost}>
        <i className="fas fa-pen nav__icon"></i>
        <p className="nav__text">Upload a Post</p>
      </div>
    </nav>
  );
};

export default NavBar;
