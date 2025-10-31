import { ProductDetails } from '../views/auth/AuthenticatedRoutes/ProductDetails';
import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, FC, useContext, useState } from 'react';

interface FavContext {
  favourites: ProductDetails[];
  isFavourite(products: ProductDetails): boolean;
  updateFavourite(product: ProductDetails): void;
}

const FavouriteContext = createContext<FavContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const FavouriteProvider: FC<Props> = ({ children }) => {
  const [favouriteProduct, setFavouriteProducts] = useState<ProductDetails[]>(
    [],
  );

  function updateFavourite(product: ProductDetails) {
    //if poduct exist remove it from favourite and if it doesnot exist add it

    const index = favouriteProduct.findIndex(e => e.id === product.id);
    //found
    if (index !== -1) {
      setFavouriteProducts(oldItems => {
        const newList = oldItems.filter(e => e.id !== product.id);
        return newList;
      });
      console.log('removed');
    } else {
      setFavouriteProducts(old => [...old, product]);
      console.log('added');
    }
  }

  function isFavourite(product: ProductDetails): boolean {
    const exists = favouriteProduct.findIndex(e => e.id === product.id) !== -1;
    console.log(exists);
    return exists;
  }
  return (
    <FavouriteContext.Provider
      value={{
        favourites: favouriteProduct,
        isFavourite: isFavourite,
        updateFavourite: updateFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
export const useFavorite = () => useContext(FavouriteContext);

const styles = StyleSheet.create({});
