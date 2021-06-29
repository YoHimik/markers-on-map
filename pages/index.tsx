import React, { FC, ReactElement } from 'react';
import { GetServerSidePropsContext } from 'next';
import { PageTitle } from '../src/components/common/PageTitle';
import { AvailabilityMap } from '../src/components/AvailabilityMap';
import { useCommonTranslate } from '../src/hooks/useTranslateOnUserLanguage';
import { client } from '../src/api/client';
import { Stations } from '../src/api/queries';
import { Station } from '../src/api/dtos';
import { MapContextProvider } from '../src/contexts/MapContext';
import { UserLocation } from '../src/types/common';
import { LATITUDE_COOKIE_NAME, LONGITUDE_COOKIE_NAME } from '../src/const/cookies';
import { UserDock } from '../src/components/UserDock';

type IndexPageProps = {
  userLocation?: UserLocation,
  stations: Station[],
};

const IndexPage: FC<IndexPageProps> = (props): ReactElement => {
  const { userLocation, stations } = props;

  const { projectName } = useCommonTranslate();

  return (
    <>
      <PageTitle title={projectName} />
      <MapContextProvider
        userLocationFromCookie={userLocation}
        stations={stations}
      >
        <AvailabilityMap />
        <UserDock />
      </MapContextProvider>
    </>
  );
};

export default IndexPage;

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const props: IndexPageProps = {
    stations: [],
  };

  const latNumber = Number(context.req.cookies[LATITUDE_COOKIE_NAME]);
  const lonNumber = latNumber && Number(context.req.cookies[LONGITUDE_COOKIE_NAME]);
  if (lonNumber) {
    props.userLocation = [lonNumber, latNumber];
  }

  const res = await client.query<{ stations: Station[] }>({
    query: Stations.getStations(),
  });
  props.stations = res.data.stations;

  return {
    props,
  };
}
