import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import Environment from '../../constants/Environment';

export const GraphQL: React.FC = ({children}) => {
  const uri = Environment.graphqlURL;
  const cache = new InMemoryCache();

  let client = new ApolloClient({
    uri,
    cache,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
