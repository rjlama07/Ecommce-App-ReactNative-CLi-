import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
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
import CategoryBtn from '../../../components/Buttons/CategoryBtn';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeScreenParamList } from '../../../navigator/HomeStack';

// type Props = StackScreenProps<AuthStackParamList, 'home'>;
const Home = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const navigator = useNavigation<NavigationProp<HomeScreenParamList>>();
  const categoryListRef = useRef<FlatList<string>>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setSelectedCategory('All');
      try {
        const response = await client.get(NetworkRoutes.getProducts);
        const products: Product[] = response.data.products;
        setIsLoading(false);
        setProducts(products);
      } catch (e) {}
    }
    async function fetchCategories() {
      try {
        const response = await client.get(NetworkRoutes.getCategories);
        const categoriesData = ['All', ...response.data.categories];
        setCategories(categoriesData);
      } catch (e) {}
    }
    fetchProducts();
    fetchCategories();
  }, []);

  async function handleOnCategorySelect(catrgory: string) {
    setSelectedCategory(catrgory);
    setIsLoading(true);

    const index = categories.findIndex(c => c === catrgory);
    if (index !== -1 && categoryListRef.current) {
      categoryListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5, // centers the selected item (0 = left, 1 = right)
      });
    }

    try {
      if (catrgory === 'All') {
        catrgory = '';
      }
      const url = NetworkRoutes.getProducts + '/' + catrgory;
      console.log(url);
      const response = await client.get(url);
      const products: Product[] = response.data.products;
      setIsLoading(false);
      setProducts(products);
    } catch (e) {}
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View>
        <FlatList
          ref={categoryListRef}
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
            marginBottom: 16,
            paddingHorizontal: 16,
          }}
          renderItem={item => {
            return (
              <CategoryBtn
                title={item.item}
                isSelected={item.item === selectedCategory}
                onPress={() => {
                  handleOnCategorySelect(item.item);
                }}
              />
            );
          }}
        />
      </View>
      {isLoading && <LoadingView></LoadingView>}

      {!isLoading && (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 10,
          }}
          data={products}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>No items found</Text>
            </View>
          }
          keyExtractor={item => item.id.toString()}
          renderItem={item => {
            return (
              <ProductCart
                onPress={() => {
                  navigator.navigate('product', { id: item.item.id });
                }}
                {...item.item}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
