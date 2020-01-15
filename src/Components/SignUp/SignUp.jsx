import React, { useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";

const SignUp = props => {
  let [name, changeName] = useState("");
  let [email, changeEmail] = useState("");
  let [password, changePassword] = useState("");
  let [address, changeAddress] = useState("");
  let [error, changeError] = useState("");
  let [spinner, changeSpinner] = useState(false);

  const submitForm = e => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || address === "") {
      changeError("Please fill all the fields");
    } else {
      changeSpinner(true);

      props
        .signUp(name, email, password, address)
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
    <section className="signup">
      <h2 className="section-heading">SignUp</h2>

      <form className="form" onSubmit={submitForm}>
        <p className="form__error">{error}</p>

        <input
          type="text"
          placeholder="Name..."
          className="form__input"
          onChange={e => changeName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Address..."
          className="form__input"
          onChange={e => changeAddress(e.target.value)}
        />
        <button className="form__btn btn-hover">SignUp</button>
        <p className="form__additional">
          Already have an account?
          <Link to="/login" className="link">
            <span> Login</span>
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

export default SignUp;
