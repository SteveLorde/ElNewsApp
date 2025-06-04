import React, { createContext, useState } from "react";
import { NewsService } from "../newsService/NewsService";

interface MainContextType {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  newsService: NewsService;
}

export const MainContext = createContext<MainContextType>({
  selectedPage: 0,
  newsService: {} as NewsService,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedPage(_value: ((prevState: number) => number) | number): void {},
});

export function MainContextProvider({ children }) {
  const _newsService = new NewsService();
  const [selectedTab, setSelectedTab] = useState(0);

  const contextValue: MainContextType = {
    selectedPage: selectedTab,
    setSelectedPage: setSelectedTab,
    newsService: _newsService,
  };

  return (
    <>
      <MainContext.Provider value={contextValue}>
        {children}
      </MainContext.Provider>
    </>
  );
}
