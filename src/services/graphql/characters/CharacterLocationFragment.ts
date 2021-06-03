import gql from 'graphql-tag';

export const CharacterLocationFragment = gql`
  fragment CharacterLocationFragment on Location {
    id
    name
    type
    dimension
    created
  }
`;
