import React from "react";
import spinner from "./spinner.gif";

export default ({ nonDefaultedSpinner }) => {
  return (
    <div>
      <img
        src={
          nonDefaultedSpinner !== null && nonDefaultedSpinner !== undefined
            ? nonDefaultedSpinner
            : spinner
        }
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
