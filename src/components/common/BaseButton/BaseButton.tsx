import React, { FC, ReactElement } from 'react';
import { ButtonBase } from '@material-ui/core';

type BaseButtonProps = {
  className?: string,
};

export const BaseButton: FC<BaseButtonProps> = (props): ReactElement => {
  const { children, className, ...restProps } = props;

  return (
    <ButtonBase className={className} {...restProps}>
      {children}
    </ButtonBase>
  );
};
