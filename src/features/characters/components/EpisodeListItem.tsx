import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Character, Episode, Maybe} from '../../../services/graphql';

const CharactersList = ({characters}: {characters: Maybe<Character>[]}) => {
  return (
    <>
      {characters.map(character => {
        return (
          <View style={styles.character}>
            <Image
              style={[
                styles.mb_5,
                {width: 36, height: 36, borderRadius: 36 / 2},
              ]}
              source={{uri: character?.avatar}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
              }}>
              {character?.name}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const EpisodeListItem = ({item}: {item: Episode}) => {
  const {name, air_date, episode, characters} = item;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.mb_5,
              {fontSize: 16, fontWeight: '700', color: 'black'},
            ]}>
            {name}
          </Text>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
            {episode}
          </Text>
        </View>
        <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
          {air_date}
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
          Characters
        </Text>
        <View style={styles.characterContainer}>
          <CharactersList characters={characters} />
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  characterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  character: {
    marginRight: 8,
  },
  mb_5: {
    marginBottom: 5,
  },
});

export default EpisodeListItem;
