enum ReleaseChannel {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

const releaseChannel = ReleaseChannel.development;

const ENV: Record<string, Environment> = {
  [ReleaseChannel.development]: {
    graphqlURL: 'https://rickandmortyapi.com/graphql',
  },
  [ReleaseChannel.staging]: {
    graphqlURL: 'https://rickandmortyapi.com/graphql',
  },
  [ReleaseChannel.production]: {
    graphqlURL: 'https://rickandmortyapi.com/graphql',
  },
};

export type Environment = {
  graphqlURL: string;
};

export default ENV[releaseChannel];
