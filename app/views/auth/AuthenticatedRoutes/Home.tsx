import { Image, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigator/AuthStack';
import { getItemFromLocalStorage } from '../../../utils/localSorage';
import LocalStorageKey from '../../../constants/localstorage';
import client, { NetworkRoutes } from '../../../api/client';
import Product from '../../../models/ProductModel';
import { FlatList } from 'react-native';
import LoadingView from '../../../components/loading/LoadingView';
import ProductCart from '../../../components/ProductCart/ProductCart';

// type Props = StackScreenProps<AuthStackParamList, 'home'>;
const Home = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await client.get(NetworkRoutes.getProducts);
        const products: Product[] = response.data.products;
        console.log('Products');
        console.log(products);
        console.log(products.length);
        setIsLoading(false);
        setProducts(products);
      } catch (e) {}
    }
    fetchProducts();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 10,
        }}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={item => {
          return <ProductCart {...item.item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
