import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { formatPrice } from '../utils/formatters';

interface Props {
  price: {
    mrp: number;
    sale: number;
  };
}

const Price: FC<Props> = props => {
  return (
    <View style={styles.priceContiner}>
      <Text style={styles.price}>Price: </Text>
      <Text style={styles.mrp}>{formatPrice(props.price.mrp)}</Text>
      <Text>{formatPrice(props.price.sale)}</Text>
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
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
});
