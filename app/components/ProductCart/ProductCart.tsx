import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import React, { FC } from 'react';
import Product from '../../models/ProductModel';

const deviceWidth = Dimensions.get('window').width;
const ProductCart: FC<Product> = props => {
  const imageWidth = deviceWidth - (32 + 20);
  const imageHeight = (imageWidth * 9) / 16;
  return (
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
      <View style={styles.priceContiner}>
        <Text style={styles.price}>Price: </Text>
        <Text style={styles.mrp}>{formatPrice(props.price.mrp)}</Text>
        <Text>{formatPrice(props.price.sale)}</Text>
      </View>
    </View>
  );
};

function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
  });
  return formatter.format(price);
}

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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  mrp: {
    marginRight: 8,
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
});
