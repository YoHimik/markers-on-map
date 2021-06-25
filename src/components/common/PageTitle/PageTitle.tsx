import React, { FC, ReactElement } from 'react';
import Head from 'next/head';

type PageTitleProps = {
  title: string,
};

export const PageTitle: FC<PageTitleProps> = (props): ReactElement => {
  const { title } = props;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
