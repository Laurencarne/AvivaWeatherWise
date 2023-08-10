import { createContext, useCallback, useState } from "react";
import { query } from "./api";

type LocationQueryContext = {
  locationQuery: string;
  updateLocation: (location: string) => void;
};

export const LocationQueryContext = createContext<LocationQueryContext>({
  locationQuery: query,
  updateLocation: () => undefined,
});

export const LocationQueryContextProvider = ({
  children,
}: {
  children: any;
}) => {
  const [locationQuery, setLocationQuery] = useState(query);

  const updateLocation = useCallback(
    (location: string) => {
      setLocationQuery(location);
    },
    [setLocationQuery]
  );

  const value: LocationQueryContext = { locationQuery, updateLocation };
  return (
    <LocationQueryContext.Provider value={value}>
      {children}
    </LocationQueryContext.Provider>
  );
};
