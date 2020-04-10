import React, { useState } from "react";
import Classifier from "./Classifier.jsx";

function Searcher(props) {
  /* States */
  const [inputText, setInputText] = useState("");

  /* Global variables */
  let timeOut;

  function handleKeyUp(e) {
    timeOut = setTimeout(() => {
      props.onQueryStringChange(inputText);
      clearTimeOut();
    }, 100);
  }

  function clearTimeOut() {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
  }

  return (
    <div className="searcher">
      <div className="search-input">
        <input
          type="text"
          placeholder="Write your pokemon name!"
          autoFocus
          onKeyUp={(e) => handleKeyUp(e)}
          onKeyDown={clearTimeOut}
          onInput={(e) => {
            setInputText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
export default Searcher;
