import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function FilterCriteria(props) {
  return (
    <div className="filter-criteria">
      <div className="text">{props.name}</div>
      <div className="x" onClick={props.onCloseCriteriaClick}>
        <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
      </div>
    </div>
  );
}
export default FilterCriteria;
