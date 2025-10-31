import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../../context/CartProvider';
import { formatPrice } from '../../../utils/formatters';
import AppColors from '../../../constants/AppColors';

const Cart = () => {
  const cartContex = useCart();
  if (cartContex && cartContex.items.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          You don't have any items in the cart
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 0 }} edges={['top']}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={cartContex?.items}
          contentContainerStyle={{
            gap: 16,
            paddingHorizontal: 16,
          }}
          keyExtractor={item => item.product.id.toString()}
          renderItem={item => {
            const product = item.item.product;
            return (
              <View style={styles.listTile}>
                <Image
                  source={{ uri: product.poster }}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text style={styles.productPrice}>
                    {formatPrice(product.price.sale)} x {item.item.count}
                  </Text>
                  <Text style={styles.totalPrice}>
                    {formatPrice(product.price.sale * item.item.count)}
                  </Text>
                  <View style={styles.cartActions}>
                    <TouchableOpacity
                      onPress={() => {
                        cartContex?.updateCart(product, -1);
                      }}
                    >
                      <Text style={styles.actionButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.cartCountText}>{item.item.count}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        cartContex?.updateCart(product, 1);
                      }}
                    >
                      <Text style={styles.actionButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      {/* total price */}
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 16,
          justifyContent: 'flex-end',
          // alignItems: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Total Price: </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {cartContex?.countTotalPrice()}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  listTile: {
    flexDirection: 'row',
  },
  productImage: {
    // height: 80,
    minHeight: 100,
    width: 100,
    marginRight: 12,
  },
  productDetails: {
    paddingVertical: 2,
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    color: 'gray',
  },
  totalPrice: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  cartActions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: AppColors.primaryColor,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  actionButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalPriceIndicator: {},
});
