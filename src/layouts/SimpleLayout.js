import React from "react";

const SimpleLayout = ({ children }) => {
  return (
    <>
      <div className="full-div">{children}</div>
    </>
  );
};

export default SimpleLayout;