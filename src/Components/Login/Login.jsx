import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";

const Login = props => {
  let [email, changeEmail] = useState("");
  let [password, changePassword] = useState("");
  let [error, changeError] = useState("");
  let [spinner, changeSpinner] = useState(false);

  const submitForm = e => {
    e.preventDefault();

    if (email === "" || password === "") {
      changeError("Please fill all the fields");
    } else {
      changeSpinner(true);

      props
        .login(email, password)
        .then(() => {
          changeSpinner(false);
        })
        .catch(er => {
          changeError(er);
          changeSpinner(false);
        });
    }
  };

  return (
    <section className="login">
      <h2 className="section-heading">Login</h2>

      <form className="form" onSubmit={submitForm}>
        <p className="form__error">{error}</p>

        <input
          type="email"
          placeholder="Email..."
          className="form__input"
          onChange={e => changeEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password..."
          className="form__input"
          onChange={e => changePassword(e.target.value)}
        />

        <button className="form__btn btn-hover">Login</button>

        <p className="form__additional">
          Don't have an account?
          <Link to="/signup" className="link">
            <span> SignUp</span>
          </Link>
        </p>
      </form>

      {spinner ? (
        <>
          <Spinner />
          <Backdrop />
        </>
      ) : null}
    </section>
  );
};

export default Login;
