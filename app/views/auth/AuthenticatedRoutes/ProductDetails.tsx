import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeScreenParamList } from '../../../navigator/HomeStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import client, { NetworkRoutes } from '../../../api/client';
import Product from '../../../models/ProductModel';
import LoadingView from '../../../components/loading/LoadingView';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';

type Props = StackScreenProps<HomeScreenParamList, 'product'>;

interface ProductDetails extends Product {
  images: string[];
  bulletPoints: string[];
}

const ProductDetails: FC<Props> = ({ route }) => {
  const params = route.params.id;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const width = Dimensions.get('window').width;

  useEffect(() => {
    async function fetchProductDetails() {
      setIsLoading(true);
      try {
        const response = await client.get(
          NetworkRoutes.productDetail(params.toString()),
        );
        console.log(response.data.product);
        const product: ProductDetails = response.data.product;
        console.log(product);
        setProduct(product);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProductDetails();
  }, []);

  if (isLoading || product === null) {
    return <LoadingView />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 12,
      }}
    >
      <View>
        <View>
          <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={product.images}
            keyExtractor={item => item}
            renderItem={items => {
              return (
                <Image
                  source={{ uri: items.item }}
                  style={{
                    height: width,
                    width: width,
                  }}
                />
              );
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text
            style={[
              styles.title,
              {
                marginTop: 16,
                marginBottom: 8,
              },
            ]}
          >
            Key Features
          </Text>
          {product.bulletPoints.map(e => {
            return (
              <Text style={styles.bulletPoints} key={e}>
                {e}
              </Text>
            );
          })}
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
        }}
      >
        <PrimaryButton title="Buy Now" />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 400,
    textAlign: 'justify',
  },
  bulletPoints: {
    marginVertical: 6,
    fontWeight: 600,
    paddingLeft: 6,
  },
});
