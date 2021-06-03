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
import {Character, Characters, Info, Maybe} from '../../../services/graphql';
import {useCharactersQuery} from '../apis/useCharactersQuery';
import {CharacterListItem} from '../components/CharacterListItem';
import {characterRepositoryInjectionKey} from '../injection-keys';

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

  const {data, loading, error, fetchMore} = useCharactersQuery({
    page: 1,
  });

  const [characters, setCharacters] = React.useState<Character[]>([]);
  const [listInfo, setListInfo] = React.useState<Info>();
  const [isMoreLoading, setIsMoreLoading] = React.useState<boolean>(false);

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

    setIsMoreLoading(true);
    fetchMore({
      variables: {page: listInfo?.next ?? 2},
    }).then(
      ({
        data: {characters: moreCharacters},
      }: {
        data: {
          characters: Maybe<Characters>;
        };
      }) => {
        if (moreCharacters && moreCharacters.results && moreCharacters.info) {
          const totalCharacters = characterRepository.mergeCharacters(
            characters,
            moreCharacters.results,
          );

          setCharacters([...totalCharacters]);
          setListInfo(moreCharacters.info);
        }

        setIsMoreLoading(false);
      },
    );
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
        {loading || isMoreLoading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text>Load More</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Characters</Text>
      {error && <Text style={styles.errorText}>No characters!</Text>}
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
  errorText: {
    fontSize: 16,
    color: 'black',
    padding: 20,
    alignSelf: 'center',
  },
});

export default CharactersList;
