import React, { useState, useContext } from "react";
import Classifier from "./Classifier.jsx";
import { onQueryStringChange } from "../js/contexts";

function Searcher(props) {
  /* States */
  const [inputText, setInputText] = useState("");

  /* Contexts */
  const queryStringChangeFunc = useContext(onQueryStringChange);

  /* Global variables */
  let timeOut;

  function handleKeyUp(e) {
    timeOut = setTimeout(() => {
      queryStringChangeFunc(inputText);
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
      <Classifier onNewCriteriaAdded={props.onNewCriteriaAdded}></Classifier>
    </div>
  );
}
export default Searcher;
