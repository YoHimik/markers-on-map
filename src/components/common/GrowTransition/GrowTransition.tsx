import React, { FC, ReactElement } from 'react';
import { Grow } from '@material-ui/core';

type GrowTransitionProps = {
  visible?: boolean,
  children: ReactElement,
};

export const GrowTransition: FC<GrowTransitionProps> = (props): ReactElement => {
  const { children, visible } = props;

  return (
    <Grow in={visible}>
      {children}
    </Grow>
  );
};
