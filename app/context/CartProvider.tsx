import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, FC, useContext, useState } from 'react';
import { ProductDetails } from '../views/auth/AuthenticatedRoutes/ProductDetails';

type CartItem = {
  product: ProductDetails;
  count: number;
};

interface DefaultCartContext {
  items: CartItem[];
  updateCart(product: ProductDetails, qty: number): void;
  removeFromCart(product: ProductDetails): void;
  clearCart(): void;
  countAllItems(): number;
  countTotalPrice(): string;
}

interface Props {
  children: React.ReactNode;
}

const CartContext = createContext<DefaultCartContext | null>(null);

const CartProvider: FC<Props> = props => {
  const [cartItems, setCartITems] = useState<CartItem[]>([]);
  function updateCart(product: ProductDetails, qty: number) {
    const finalCartITems: CartItem[] = [...cartItems];
    const exist = cartItems.findIndex(e => e.product.id === product.id);
    if (exist! !== -1) {
      if (qty < 0 && finalCartITems[exist].count <= 1) {
        removeFromCart(product);
      } else {
        finalCartITems[exist].count += qty;
        setCartITems(finalCartITems);
      }
    } else {
      const cart: CartItem = {
        product: { ...product },
        count: qty,
      };
      setCartITems(pre => [cart, ...pre]);
    }
  }
  function removeFromCart(product: ProductDetails) {
    const removedItem = cartItems.filter(e => e.product.id !== product.id);
    setCartITems(removedItem);
  }
  function clearCart() {}
  function countAllItems(): number {
    const totalCount = cartItems.reduce((acc, total) => acc + total.count, 0);
    return totalCount;
  }
  function countTotalPrice(): string {
    const totalPrice = cartItems.reduce(
      (acc, total) => acc + total.count * total.product.price.sale,
      0,
    );
    return totalPrice.toString();
  }
  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart: updateCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
        countAllItems: countAllItems,
        countTotalPrice: countTotalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;

const styles = StyleSheet.create({});
