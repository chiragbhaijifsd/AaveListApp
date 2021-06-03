import {ApolloError, useQuery} from '@apollo/client';
import {Query, QueryCharactersArgs} from '../../../services/graphql';
import {CharactersQuery} from '../../../services/graphql/characters/CharactersQuery';

export const useCharactersQuery = (
  args: QueryCharactersArgs,
): {
  data: any;
  loading: boolean;
  error?: ApolloError;
  fetchMore: any;
} => {
  const {data, loading, fetchMore, error} = useQuery<
    Pick<Query, 'characters'>,
    QueryCharactersArgs
  >(CharactersQuery, {
    fetchPolicy: 'network-only',
    variables: args,
  });

  return {
    data,
    loading,
    error,
    fetchMore,
  };
};
