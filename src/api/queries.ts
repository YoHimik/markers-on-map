import { gql } from '@apollo/client';

export const Stations = {
  getStations: () => gql`
      query {
        stations {
          station_id
          name
          address
          lat
          lon
          capacity
          availability {
            is_installed
            is_renting
            num_bikes_available
            num_docks_available
            last_reported
            is_returning
          }
        }
      }
    `,
};
