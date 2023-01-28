import React, { useState } from "react";

const SimpleLayout = ({ children }) => {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <div className="full-div">{children}</div>
    </>
  );
};

export default SimpleLayout;