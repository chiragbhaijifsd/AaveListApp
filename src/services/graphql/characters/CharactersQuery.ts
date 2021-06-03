import gql from 'graphql-tag';
import {CharacterFragment} from './CharacterFragment';

export const CharactersQuery = gql`
  query CharactersQuery($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...CharacterFragment
      }
    }
  }
  ${CharacterFragment}
`;
