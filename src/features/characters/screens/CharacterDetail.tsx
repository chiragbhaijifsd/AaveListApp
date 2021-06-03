import {useQuery} from '@apollo/client';
import {RouteProp} from '@react-navigation/core';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CharactersScreen} from '../../../app/navigation/enums/CharactersScreen';
import {CharactersNavigatorParamsList} from '../../../app/navigation/params/CharactersNavigatorParamsList';
import {Query, QueryCharacterArgs} from '../../../services/graphql';
import {CharacterQuery} from '../../../services/graphql/characters/CharacterQuery';
import EpisodeListItem from '../components/EpisodeListItem';

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

const BANNER_HEIGHT = 300;
const containerWidth = 36;
const containerHeight = 20;

export const CharacterDetail: React.FC<{
  route: RouteProp<
    CharactersNavigatorParamsList,
    CharactersScreen.CharacterDetail
  >;
}> = ({route}) => {
  const {id} = route.params;
  const {data} = useCharacterQuery({id});

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.banner}
          source={{uri: data?.image}}
          resizeMode={'cover'}
        />
        <View style={styles.contentContainer}>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <Text
              numberOfLines={1}
              style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
              {data?.name}
            </Text>
            <View
              style={{
                backgroundColor: 'green',
                borderRadius: 3,
                width: containerWidth,
                height: containerHeight,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: '700'}}>
                {data?.status}
              </Text>
            </View>
          </View>

          <View style={styles.detailItemContainer}>
            <View style={[styles.keyInfo, {marginRight: 20}]}>
              <Text
                style={{
                  marginBottom: 3,
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Species
              </Text>
              <Text
                style={{
                  width: 64,
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'black',
                }}>
                {data?.species}
              </Text>
            </View>
            <View style={styles.keyInfo}>
              <Text
                style={{
                  marginBottom: 3,
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'black',
                }}>
                Gender
              </Text>
              <Text
                style={{
                  width: 64,
                  fontSize: 12,
                  fontWeight: '700',
                  color: 'black',
                }}>
                {data?.gender}
              </Text>
            </View>
          </View>

          {/* <DescriptionCard
            style={{marginTop: Dimens.STANDARD}}
            label={'Location'}
            item={data.location}
          />
          <DescriptionCard
            style={{marginTop: Dimens.STANDARD}}
            label={'Origin'}
            item={data.origin}
          />
          <H2 style={{marginTop: Dimens.SMALL}} numberOfLines={1}>
            {Strings.EPISODES}
          </H2> */}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data?.episode}
            style={styles.listContainer}
            keyExtractor={item => item.id.toString()}
            renderItem={episodeItem => (
              <EpisodeListItem item={episodeItem.item} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  banner: {
    height: BANNER_HEIGHT,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  listContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  detailItemContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  keyInfo: {
    flexDirection: 'column',
    marginTop: 3,
  },
});

export default CharacterDetail;
