import React, {
  FC,
  ReactElement,
} from 'react';
import { Map } from '../common/Map';
import styles from './AvailabilityMap.module.scss';

type AvailabilityMapProps = {
};

export const AvailabilityMap: FC<AvailabilityMapProps> = (): ReactElement => (
  <Map center={[30, 59]} zoom={9} className={styles.map} />
);
