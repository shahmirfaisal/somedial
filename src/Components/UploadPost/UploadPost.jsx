import React, { useContext, useState } from "react";
import NavContext from "../../Context/NavContext";

const UploadPost = props => {
  const context = useContext(NavContext);
  let [text, changeText] = useState("");

  const uploadPost = () => {
    if (text.trim() !== "") {
      props.uploadPost(text);
    }
  };

  return (
    <section className="modal">
      <textarea
        placeholder="Enter something..."
        className="modal__text"
        onChange={e => changeText(e.target.value)}
      ></textarea>

      <button className="modal__upload btn-hover" onClick={uploadPost}>
        Upload
      </button>
      <button className="modal__cancel" onClick={context.closeUploadPost}>
        cancel
      </button>
    </section>
  );
};

export default UploadPost;
