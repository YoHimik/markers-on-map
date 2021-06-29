import React, {
  FC,
  ReactElement, useCallback, useContext,
} from 'react';
import { Map } from '../common/Map';
import styles from './AvailabilityMap.module.scss';
import { MapContext } from '../../contexts/MapContext';
import { StationInfo } from './StationInfo';
import useBool from '../../hooks/useBool';

type AvailabilityMapProps = {
};

export const AvailabilityMap: FC<AvailabilityMapProps> = (): ReactElement => {
  const {
    userLocation,
    stationsPoints,
    selectStation,
    selectedStation,
  } = useContext(MapContext);

  const [isStationInfoHidden, , setIsStationInfoHidden, setIsStationInfoVisible] = useBool(true);

  const handlePointClick = useCallback(({ properties }) => {
    if (properties.stationId) {
      selectStation(properties.stationId);
      setIsStationInfoVisible();
    } else {
      setIsStationInfoHidden();
    }
  }, [selectedStation]);

  return (
    <>
      <Map
        center={userLocation}
        className={styles.map}
        points={stationsPoints}
        onPointClick={handlePointClick}
      />
      <StationInfo
        station={selectedStation}
        hidden={isStationInfoHidden}
      />
    </>
  );
};
