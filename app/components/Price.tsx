import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

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

function formatPrice(price: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
  });
  return formatter.format(price);
}

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
