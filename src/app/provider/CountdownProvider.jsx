import React, { createContext, useContext } from "react";
import { useCountdown } from "@hooks/useCountdown";

const CountdownContext = createContext(null);

export const CountdownProvider = ({ children }) => {
  const countdown = useCountdown();

  return (
    <CountdownContext.Provider value={countdown}>
      {children}
    </CountdownContext.Provider>
  );
};

export const useCountdownContext = () => useContext(CountdownContext);
