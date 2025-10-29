import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  ViewToken,
  Pressable,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeScreenParamList } from '../../../navigator/HomeStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import client, { NetworkRoutes } from '../../../api/client';
import Product from '../../../models/ProductModel';
import LoadingView from '../../../components/loading/LoadingView';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import Price from '../../../components/Price';
import { AntDesign } from '@react-native-vector-icons/ant-design';

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
  const [currentViewIndex, setCurrentVewIndex] = useState<number | null>(0);
  const scrollRef = useRef<FlatList<string>>(null);
  const onViewableItemsChanged = useRef(
    (info: {
      viewableItems: ViewToken<string>[];
      changed: ViewToken<string>[];
    }) => {
      setCurrentVewIndex(info.viewableItems[0]?.index);
    },
  );
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 100,
  });

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

  function scrollImage(index: number) {
    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 12,
      }}
    >
      <ScrollView
        style={{
          paddingBottom: 16,
        }}
      >
        <View>
          <FlatList
            ref={scrollRef}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[product.poster, ...product.images]}
            keyExtractor={(item, index) => item + index}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            renderItem={items => {
              return (
                <Image
                  source={{ uri: items.item }}
                  resizeMode="cover"
                  style={{
                    height: width,
                    width: width,
                  }}
                />
              );
            }}
          />
        </View>
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
          <FlatList
            scrollEnabled={false}
            pagingEnabled
            horizontal
            contentContainerStyle={{
              gap: 4,
            }}
            showsHorizontalScrollIndicator={false}
            data={[product.poster, ...product.images]}
            keyExtractor={(item, index) => item + index}
            renderItem={items => {
              return (
                <Pressable onPress={() => scrollImage(items.index)}>
                  <Image
                    source={{ uri: items.item }}
                    style={{
                      height: 60,
                      borderRadius: 12,
                      width: 60,
                      resizeMode: 'cover',
                      transform: [
                        { scale: items.index === currentViewIndex ? 1 : 0.5 },
                      ],
                    }}
                  />
                </Pressable>
              );
            }}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View
            style={{
              marginVertical: 12,
            }}
          >
            <Price price={product.price} />
          </View>
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
              <View style={styles.bulletPointContainer}>
                <View style={styles.bullet}></View>
                <Text style={styles.bulletPoints} key={e}>
                  {e}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',

          gap: 8,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <PrimaryButton title="Buy Now" />
        </View>
        <View>
          <Pressable style={styles.actionButtonStyle}>
            <AntDesign name="shopping-cart" size={24} />
          </Pressable>
        </View>
        <View>
          <Pressable style={styles.actionButtonStyle}>
            <AntDesign name="heart" size={24} />
          </Pressable>
        </View>
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
  actionButtonStyle: {
    backgroundColor: 'lightgrey',
    padding: 8,
    borderRadius: 12,
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
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'black',
  },
});
