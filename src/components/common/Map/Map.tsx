import React, {
  FC,
  ReactElement, useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import dynamic from 'next/dynamic';
import getConfig from 'next/config';
import mapboxgl, {
  GeoJSONSource,
  Map as MapBoxMap,
} from 'mapbox-gl';
import { UserLocation } from '../../../types/common';
import { EMPTY_FUNC } from '../../../const/common';
import { AppSettingsContext } from '../../../contexts/AppSettingsContext';

const { publicRuntimeConfig } = getConfig();

mapboxgl.accessToken = publicRuntimeConfig.mapboxPublicToken;

export type MapPoint = {
  coordinates: [number, number],
  properties: object,
};

type MapProps = {
  className?: string,
  center?: UserLocation,
  zoom?: number,
  points?: MapPoint[],
  onPointClick?: (p: MapPoint) => void,
};

const MapSSR: FC<MapProps> = (props): ReactElement => {
  const {
    className,
    center,
    zoom,
    onPointClick,
    points,
  } = props;

  const { theme: { palette } } = useContext(AppSettingsContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapBoxMap>();

  useLayoutEffect(() => {
    if (mapRef.current || !containerRef.current) return EMPTY_FUNC;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    mapRef.current?.on('load', () => {
      if (!mapRef?.current) return;

      // TODO: refactor!
      mapRef.current.addSource('points', {
        type: 'geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 100,
        data: {
          type: 'FeatureCollection',
          features: (points || [])?.map((p) => ({
            type: 'Feature',
            properties: p.properties,
            geometry: {
              type: 'Point',
              coordinates: p.coordinates,
            },
          })),
        },
      });

      mapRef.current.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'points',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            palette.primary.main,
            100,
            palette.secondary.main,
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
          ],
        },
      });

      mapRef.current.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 18,
        },
        paint: {
          'text-color': palette.text.secondary,
        },
      });

      mapRef.current.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': palette.primary.main,
          'circle-radius': 8,
          'circle-stroke-width': 1,
          'circle-stroke-color': palette.background.default,
        },
      });

      mapRef.current.on('click', 'clusters', (e) => {
        const features = mapRef?.current?.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features?.[0]?.properties?.cluster_id;
        if (!clusterId) return;

        const source = mapRef?.current?.getSource('points') as GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, newZoom) => {
          if (err) return;

          const coordinates = features?.[0].geometry?.type === 'Point'
            ? features[0].geometry.coordinates
            : null;
          if (!coordinates) return;

          mapRef?.current?.easeTo({
            center: [coordinates[0], coordinates[1]],
            zoom: newZoom,
          });
        });
      });

      mapRef?.current?.on('click', () => {
        if (!onPointClick) return;
        onPointClick({
          coordinates: [0, 0],
          properties: {},
        });
      });

      mapRef?.current?.on('click', 'unclustered-point', (e) => {
        const position = e?.features?.[0]?.geometry?.type === 'Point'
          ? e.features[0].geometry.coordinates
          : null;
        if (!position) return;

        const coordinates: UserLocation = [position[1], position[0]];
        if (onPointClick) {
          onPointClick({
            coordinates,
            properties: e?.features?.[0]?.properties || {},
          });
        }
        mapRef?.current?.easeTo({
          center: [position[0], position[1]],
          zoom: 15,
        });
      });

      mapRef?.current?.on('mouseenter', 'clusters', () => {
        if (!mapRef?.current?.getCanvas()) return;
        mapRef.current.getCanvas().style.cursor = 'pointer';
      });
      mapRef?.current?.on('mouseleave', 'clusters', () => {
        if (!mapRef?.current?.getCanvas()) return;
        mapRef.current.getCanvas().style.cursor = '';
      });

      mapRef?.current?.on('mouseenter', 'unclustered-point', () => {
        if (!mapRef?.current?.getCanvas()) return;
        mapRef.current.getCanvas().style.cursor = 'pointer';
      });
      mapRef?.current?.on('mouseleave', 'unclustered-point', () => {
        if (!mapRef?.current?.getCanvas()) return;
        mapRef.current.getCanvas().style.cursor = '';
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = undefined;
    };
  }, []);

  useLayoutEffect(() => {
    if (!mapRef?.current?.loaded()) return;
    mapRef.current?.easeTo({
      zoom,
      center,
    });
  }, [zoom, center]);

  return (
    <div ref={containerRef} className={className} />
  );
};

MapSSR.defaultProps = {
  zoom: 12,
  center: [0, 0],
  points: [],
  onPointClick: EMPTY_FUNC,
};

export const Map = dynamic(() => Promise.resolve(MapSSR), {
  ssr: false,
});
