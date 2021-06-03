import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getItemLayout} from '../../../constants/Layout';
import {Character, Episode} from '../../../services/graphql';
import {EpisodeCharactersListItem} from './EpisodeCharactersListItem';

const characterListItem = 60;

const EpisodeListItemBase = ({item}: {item: Episode}) => {
  const {name, air_date, episode, characters} = item;

  const renderCharactersListItem = ({character}: {character: Character}) => (
    <EpisodeCharactersListItem
      style={{height: characterListItem}}
      name={character?.name ?? ''}
      species={character?.species ?? ''}
      gender={character?.gender ?? ''}
    />
  );

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.episodeName}>
          {episode} | {air_date}
        </Text>
      </View>
      <View style={styles.charactersContainer}>
        <Text style={styles.charactersLabel}>Characters</Text>
        <FlatList
          nestedScrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={characters ?? []}
          getItemLayout={(_, index) => getItemLayout(index, characterListItem)}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderCharactersListItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
    marginBottom: 24,
  },
  name: {fontSize: 16, fontWeight: '500', color: 'black'},
  episodeName: {fontSize: 14, color: '#00000090'},
  charactersContainer: {marginTop: 10},
  charactersLabel: {fontSize: 16, fontWeight: '500', color: 'black'},
});

export const EpisodeListItem = React.memo(EpisodeListItemBase);
