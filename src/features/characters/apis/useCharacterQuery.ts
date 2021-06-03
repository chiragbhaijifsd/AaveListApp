import {ApolloError, useQuery} from '@apollo/client';
import {Query, QueryCharacterArgs} from '../../../services/graphql';
import {CharacterQuery} from '../../../services/graphql/characters/CharacterQuery';

export const useCharacterQuery = (
  args: QueryCharacterArgs,
): {
  data: any;
  loading: boolean;
  error?: ApolloError;
} => {
  const {data, loading, error} = useQuery<
    Pick<Query, 'character'>,
    QueryCharacterArgs
  >(CharacterQuery, {
    fetchPolicy: 'network-only',
    variables: args,
  });

  return {
    data: data?.character,
    loading,
    error,
  };
};
