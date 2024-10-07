import { MainContext } from "./contexts/main.js";
import { useState } from "react";

const Root = ({ children }) => {
  const [context, setContext] = useState();
  return (
    <MainContext.Provider value={{ context, setContext }}>
      {children}
    </MainContext.Provider>
  );
};

export default Root;
