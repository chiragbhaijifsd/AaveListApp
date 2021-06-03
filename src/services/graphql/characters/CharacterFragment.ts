import gql from 'graphql-tag';

export const CharacterFragment = gql`
  fragment CharacterFragment on Character {
    id
    name
    status
    species
    gender
    image
    created
  }
`;
