import React, { FC, ReactElement, ReactNode } from 'react';
import { Text } from '../common/Text';
import { BaseButton } from '../common/BaseButton';
import styles from './UserDock.module.scss';

type DockButtonProps = {
  label: string,
  icon: ReactNode,
};

export const DockButton: FC<DockButtonProps> = (props): ReactElement => {
  const { children, label, icon } = props;

  return (
    <BaseButton className={styles.dockButton}>
      {icon}
      {children}
      <Text>{label}</Text>
    </BaseButton>
  );
};
