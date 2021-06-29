import React, { FC, ReactElement } from 'react';
import { DockButton } from './DockButton';
import { PaperBox } from '../common/PapperBox';
import {
  MapIcon, VehicleIcon, JobsIcon, ZonesIcon, CrewIcon,
} from '../common/icons';
import { useCommonTranslate } from '../../hooks/useTranslateOnUserLanguage';
import styles from './UserDock.module.scss';

type UserDockProps = {};

export const UserDock: FC<UserDockProps> = (): ReactElement => {
  const commonTranslates = useCommonTranslate();

  return (
    <PaperBox className={styles.dock}>
      <DockButton
        label={commonTranslates.mapLabel}
        icon={<MapIcon />}
      />
      <DockButton
        label={commonTranslates.vehicleLabel}
        icon={<VehicleIcon />}
      />
      <DockButton
        label={commonTranslates.jobsLabel}
        icon={<JobsIcon />}
      />
      <DockButton
        label={commonTranslates.zonesLabel}
        icon={<ZonesIcon />}
      />
      <DockButton
        label={commonTranslates.crewLabel}
        icon={<CrewIcon />}
      />
    </PaperBox>
  );
};
