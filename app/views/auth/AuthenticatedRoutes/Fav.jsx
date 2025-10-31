import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorite } from '../../../context/FavouriteProvider';
import { formatPrice } from '../../../utils/formatters';
import AntDesign from '@react-native-vector-icons/ant-design';
const deviceWidth = Dimensions.get('screen').width;
const horizontalPadding = 16;
const eachItemWidth = (deviceWidth - 16 - horizontalPadding * 2) / 2;
const Fav = () => {
  const favContext = useFavorite();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          gap: 16,
          flexGrow: 1, // allow empty component to fill space
          justifyContent:
            favContext.favourites.length === 0 ? 'center' : 'flex-start',
        }}
        columnWrapperStyle={{
          gap: 16,
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,

              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>No Items Found</Text>
          </View>
        }
        numColumns={2}
        data={favContext.favourites}
        keyExtractor={item => item.id.toString()}
        renderItem={item => {
          const favourite = item.item;
          return (
            <View>
              <View>
                <Image
                  source={{ uri: favourite.poster }}
                  style={{
                    marginBottom: 8,
                    width: eachItemWidth,
                    height: 100,
                    borderRadius: 12,
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    backgroundColor: 'grey',
                    padding: 4,
                    borderRadius: 100,
                  }}
                >
                  <AntDesign size={16} name="heart" color={'red'}></AntDesign>
                </TouchableOpacity>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: eachItemWidth,
                  fontSize: 12,
                  fontWeight: 'bold',
                  padding: 2,
                }}
              >
                {favourite.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: eachItemWidth,
                  fontSize: 12,
                  fontWeight: 'bold',
                  padding: 2,
                }}
              >
                {formatPrice(favourite.price.sale)}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Fav;

const styles = StyleSheet.create({});
