import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/core';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CharactersScreen} from '../../../app/navigation/enums/CharactersScreen';
import {CharactersNavigatorParamsList} from '../../../app/navigation/params/CharactersNavigatorParamsList';
import {Episode, Query, QueryCharacterArgs} from '../../../services/graphql';
import {CharacterQuery} from '../../../services/graphql/characters/CharacterQuery';
import {EpisodeListItem} from '../components/EpisodeListItem';
import {LocationCard} from '../components/LocationCard';

const useCharacterQuery = (
  args: QueryCharacterArgs,
): {
  data: any;
  loading: boolean;
  error: any;
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

const bannerHeight = 250;
const containerWidth = 36;
const containerHeight = 20;

export const CharacterDetail: React.FC<{
  route: RouteProp<
    CharactersNavigatorParamsList,
    CharactersScreen.CharacterDetail
  >;
}> = ({route}) => {
  const {id} = route.params;
  const {data, loading} = useCharacterQuery({id});

  const renderEpisode = ({item}: {item: Episode}) => (
    <EpisodeListItem item={item} />
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.banner}
        source={{uri: data?.image}}
        resizeMode={'cover'}
      />
      <View style={styles.body}>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {data?.name}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.status}>{data?.status}</Text>
          </View>
        </View>
        <View style={styles.speciesGenderContainer}>
          <View>
            <Text style={styles.label}>Species</Text>
            <Text style={styles.value}>{data?.species}</Text>
          </View>
          <View>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{data?.gender}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <LocationCard
            label="Location"
            title={data?.location?.name}
            type={data?.location?.type}
          />
          <LocationCard
            label="Origin"
            title={data?.origin?.name}
            type={data?.origin?.type}
          />
        </View>
        <Text style={styles.episodesLabel}>List of Episodes</Text>
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          data={data?.episode ?? []}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderEpisode}
        />
      </View>
      {loading && <ActivityIndicator size="small" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
  banner: {height: bannerHeight},
  body: {paddingHorizontal: 20, paddingVertical: 3},
  nameContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  name: {fontSize: 18, fontWeight: '500', color: 'black'},
  statusContainer: {
    backgroundColor: 'green',
    borderRadius: 3,
    width: containerWidth,
    height: containerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {color: 'white', fontSize: 12, fontWeight: '700'},
  speciesGenderContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  label: {
    marginBottom: 3,
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  value: {
    width: 64,
    fontSize: 12,
    fontWeight: '700',
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  episodesLabel: {fontSize: 18, fontWeight: '500'},
});

export default CharacterDetail;
