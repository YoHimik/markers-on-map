import React, {
  FC,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import mapboxgl, { Map as MapBoxMap } from 'mapbox-gl';
import { EMPTY_FUNC } from '../../../const/common';

const { publicRuntimeConfig } = getConfig();

mapboxgl.accessToken = publicRuntimeConfig.mapboxPublicToken;

type MapProps = {
  className?: string,
  center: [number, number],
  zoom: number,
};

const MapSSR: FC<MapProps> = (props): ReactElement => {
  const { className, center, zoom } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapBoxMap>();

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return EMPTY_FUNC;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = undefined;
    };
  }, []);

  return (
    <div ref={containerRef} className={className} />
  );
};

export const Map = dynamic(() => Promise.resolve(MapSSR), {
  ssr: false,
});
