import gql from 'graphql-tag';
import {CharacterFragment} from './CharacterFragment';
import {CharacterLocationFragment} from './CharacterLocationFragment';
import {EpisodeFragment} from './EpisodeFragment';

export const CharacterQuery = gql`
  query CharacterQuery($id: ID!) {
    character(id: $id) {
      ...CharacterFragment
      location {
        ...CharacterLocationFragment
      }
      origin {
        ...CharacterLocationFragment
      }
      episode {
        ...EpisodeFragment
      }
    }
  }
  ${CharacterFragment}
  ${CharacterLocationFragment}
  ${EpisodeFragment}
`;
