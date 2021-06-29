import React, {
  FC,
  ReactElement,
  ReactNode, useLayoutEffect, useMemo, useState,
} from 'react';
import { UserLocation } from '../types/common';
import { addCookie } from '../utils/cookie';
import { LATITUDE_COOKIE_NAME, LONGITUDE_COOKIE_NAME } from '../const/cookies';
import { USER_LOCATION_CACHE_MAX_AGE } from '../const/map';
import { DEFAULT_LOCATION } from '../const/defaults';
import { Station } from '../api/dtos';
import { MapPoint } from '../components/common/Map';
import { EMPTY_FUNC } from '../const/common';

type MapContextValue = {
  userLocation?: UserLocation,
  stations: Station[],
  stationsPoints: MapPoint[],
  selectedStation?: Station,
  selectStation: (id: string) => void,
};

export const MapContext = React.createContext<MapContextValue>({
  stations: [],
  stationsPoints: [],
  selectStation: () => {},
});

type MapContextProviderProps = {
  children: ReactNode,
  userLocationFromCookie?: UserLocation,
  stations: Station[],
};

export const MapContextProvider: FC<MapContextProviderProps> = (props): ReactElement => {
  const {
    userLocationFromCookie,
    stations,
    children,
  } = props;

  const [userLocation, setUserLocation] = useState<UserLocation>(userLocationFromCookie || DEFAULT_LOCATION);

  useLayoutEffect(() => {
    if (userLocationFromCookie) return;

    navigator.geolocation.getCurrentPosition(
      (data) => {
        setUserLocation([data.coords.longitude, data.coords.latitude]);
        addCookie(LATITUDE_COOKIE_NAME, `${data.coords.latitude}`, { maxAge: USER_LOCATION_CACHE_MAX_AGE });
        addCookie(LONGITUDE_COOKIE_NAME, `${data.coords.longitude}`, { maxAge: USER_LOCATION_CACHE_MAX_AGE });
      },
      EMPTY_FUNC,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: USER_LOCATION_CACHE_MAX_AGE,
      },
    );
  }, [userLocationFromCookie]);

  const stationsPoints = useMemo(() => stations.reduce<MapPoint[]>((res, s) => {
    if (s.lon && s.lat) {
      res.push({
        coordinates: [s.lon, s.lat],
        properties: {
          stationId: s.station_id,
        },
      });
    }
    return res;
  }, []), [stations]);

  const [selectedStationId, setSelectedStationId] = useState<string>();
  const selectedStation = useMemo(() => {
    if (!selectedStationId) return undefined;

    return stations.find((s) => s.station_id === selectedStationId);
  }, [selectedStationId, stations]);

  return (
    <MapContext.Provider
      value={{
        userLocation,
        stations,
        stationsPoints,
        selectedStation,
        selectStation: setSelectedStationId,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
