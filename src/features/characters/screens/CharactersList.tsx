import {useQuery} from '@apollo/client';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CharactersScreen} from '../../../app/navigation/enums/CharactersScreen';
import {CharactersNavigatorParamsList} from '../../../app/navigation/params/CharactersNavigatorParamsList';
import {getItemLayout} from '../../../constants/Layout';
import DependencyContext from '../../../services/di/DependencyContext';
import {
  Character,
  Info,
  Query,
  QueryCharactersArgs,
} from '../../../services/graphql';
import {CharactersQuery} from '../../../services/graphql/characters/CharactersQuery';
import {CharacterListItem} from '../components/CharacterListItem';
import {characterRepositoryInjectionKey} from '../injection-keys';

const useCharactersQuery = (
  args: QueryCharactersArgs,
): {
  data: any;
  loading: boolean;
  error: any;
  fetchMore: any;
  refetch: any;
} => {
  const {data, loading, fetchMore, error, refetch} = useQuery<
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
    refetch,
  };
};

const listItemHeight = 80;

export const CharactersList: React.FC<{
  navigation: StackNavigationProp<
    CharactersNavigatorParamsList,
    CharactersScreen.CharactersList
  >;
}> = ({navigation}) => {
  const dependencies = React.useContext(DependencyContext);
  const characterRepository = dependencies.provide(
    characterRepositoryInjectionKey,
  );

  const {data, loading} = useCharactersQuery({
    page: 1,
  });

  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [listInfo, setListInfo] = React.useState<Info>();

  React.useEffect(() => {
    if (!Boolean(data)) {
      return;
    }

    const totalCharacters = characterRepository.mergeCharacters(
      characters,
      data?.characters?.results,
    );

    setCharacters([...totalCharacters]);
    setListInfo(data?.characters?.info);
  }, [data]);

  const onLoadMore = () => {
    if (!characterRepository.hasNextCharactersPage(listInfo)) {
      return;
    }

    // TODO: Fetch more
  };

  const onPressItem = (id: string) => {
    navigation.navigate(CharactersScreen.CharacterDetail, {
      id,
    });
  };

  const renderItem = ({item}: {item: Character}) => (
    <CharacterListItem
      style={styles.listItem}
      item={item}
      onPress={() => {
        if (item && item.id) {
          onPressItem(item.id);
        }
      }}
    />
  );

  const renderListFooterComponent = () => {
    return (
      <TouchableOpacity onPress={onLoadMore} style={styles.loadMoreContainer}>
        {loading ? <ActivityIndicator size="small" /> : <Text>Load More</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Characters</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        data={characters}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => getItemLayout(index, listItemHeight)}
        renderItem={renderItem}
        ListFooterComponent={renderListFooterComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  listItem: {
    height: listItemHeight,
    paddingHorizontal: 10,
  },
  loadMoreContainer: {
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default CharactersList;
