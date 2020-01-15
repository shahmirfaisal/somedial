import React, { useState } from "react";

const ChangeBio = props => {
  let [text, changeText] = useState("");

  return (
    <section className="modal">
      <textarea
        placeholder="Enter bio..."
        className="modal__text"
        onChange={e => changeText(e.target.value)}
      ></textarea>

      <button
        className="modal__upload btn-hover"
        onClick={() => {
          if (text.trim() !== "") {
            props.changeBio(text);
          }
        }}
      >
        Change Bio
      </button>
      <button className="modal__cancel" onClick={props.close}>
        cancel
      </button>
    </section>
  );
};

export default ChangeBio;
