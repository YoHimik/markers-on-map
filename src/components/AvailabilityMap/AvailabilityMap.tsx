import React, {
  FC,
  ReactElement, useContext,
} from 'react';
import { Map } from '../common/Map';
import styles from './AvailabilityMap.module.scss';
import { MapContext } from '../../contexts/MapContext';

type AvailabilityMapProps = {
};

export const AvailabilityMap: FC<AvailabilityMapProps> = (): ReactElement => {
  const { userLocation, stationsPoints } = useContext(MapContext);

  return (
    <Map
      center={userLocation}
      className={styles.map}
      points={stationsPoints}
    />
  );
};
