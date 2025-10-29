import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Touchable,
  Pressable,
} from 'react-native';
import React, { FC } from 'react';
import Product from '../../models/ProductModel';
import Price from '../Price';

const deviceWidth = Dimensions.get('window').width;
interface ProductParams extends Product {
  onPress: () => void;
}
const ProductCart: FC<ProductParams> = props => {
  const imageWidth = deviceWidth - (32 + 20);
  const imageHeight = (imageWidth * 9) / 16;
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          style={{
            width: imageWidth,
            height: imageHeight,
            marginBottom: 12,
          }}
          source={{ uri: props.poster }}
        />
        <Text style={styles.title}>{props.title}</Text>
        <Price price={props.price} />
      </View>
    </Pressable>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dedede',
    padding: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  priceContiner: {
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
  },
  mrp: {
    marginRight: 8,
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});
