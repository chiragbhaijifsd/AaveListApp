import gql from 'graphql-tag';
import {CharacterFragment} from './CharacterFragment';

export const EpisodeFragment = gql`
  fragment EpisodeFragment on Episode {
    id
    name
    air_date
    episode
    characters {
      ...CharacterFragment
    }
    created
  }
  ${CharacterFragment}
`;
