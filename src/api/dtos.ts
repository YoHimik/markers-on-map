export interface StationAvailability {
  is_installed?: boolean,
  is_renting?: boolean,
  num_bikes_available?: number,
  num_docks_available?: number,
  last_reported?: number,
  is_returning?: boolean,
}

export interface Station {
  station_id?: string,
  name?: string,
  address?: string,
  lat?: number,
  lon?: number,
  capacity?: number,
  availability?: StationAvailability,
}
