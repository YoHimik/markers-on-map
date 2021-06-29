import React, { FC, ReactElement } from 'react';
import { Paper } from '@material-ui/core';

type PaperBoxProps = {
  className?: string,
};

export const PaperBox: FC<PaperBoxProps> = (props): ReactElement => {
  const { children, className, ...restProps } = props;

  return (
    <Paper className={className} {...restProps}>
      {children}
    </Paper>
  );
};
