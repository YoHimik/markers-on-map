import React, { FC, ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import styles from './Text.module.scss';

type TextProps = {
};

export const Text: FC<TextProps> = (props): ReactElement => {
  const { children } = props;

  return (
    <Typography className={styles.text}>
      {children}
    </Typography>
  );
};
