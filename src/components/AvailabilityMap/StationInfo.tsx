import React, {
  FC,
  ReactElement,
} from 'react';
import { Station } from '../../api/dtos';
import styles from './AvailabilityMap.module.scss';
import { Text } from '../common/Text';
import { PaperBox } from '../common/PapperBox';
import { GrowTransition } from '../common/GrowTransition';
import { useCommonTranslate } from '../../hooks/useTranslateOnUserLanguage';

type StationInfoProps = {
  station?: Station,
  hidden?: boolean,
};

export const StationInfo: FC<StationInfoProps> = (props): ReactElement => {
  const { station, hidden } = props;

  const commonTranslates = useCommonTranslate();

  return (
    <GrowTransition visible={Boolean(station && !hidden)}>
      <PaperBox className={styles.stationInfoContainer}>
        <Text>{station?.name}</Text>
        <Text>{station?.address}</Text>
        <Text>{`${commonTranslates.bikesAvailableLabel}: ${station?.availability?.num_bikes_available}`}</Text>
        <Text>{`${commonTranslates.docksAvailableLabel}: ${station?.availability?.num_docks_available}`}</Text>
      </PaperBox>
    </GrowTransition>
  );
};
