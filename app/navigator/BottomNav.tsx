import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/auth/AuthenticatedRoutes/Home';
import Profile from '../views/auth/AuthenticatedRoutes/Profile';
import Fav from '../views/auth/AuthenticatedRoutes/Fav';
import Cart from '../views/auth/AuthenticatedRoutes/Cart';
import { AntDesign } from '@react-native-vector-icons/ant-design';
import { Text } from 'react-native-gesture-handler';
import HomeNavigationStack from './HomeStack';
import { useCart } from '../context/CartProvider';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const cartContet = useCart();
  const cartItemsCount = cartContet?.countAllItems();
  const cartShowItem = cartItemsCount
    ? cartItemsCount < 9
      ? cartItemsCount
      : '9+'
    : undefined;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFA500',
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigationStack}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <AntDesign name="home" size={size} color={color}></AntDesign>
            );
          },
        }}
      />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarBadge: cartShowItem,
          tabBarIcon: ({ size, color }) => {
            return (
              <AntDesign
                name="shopping-cart"
                size={size}
                color={color}
              ></AntDesign>
            );
          },
        }}
      />

      <Tab.Screen
        name="fav"
        component={Fav}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <AntDesign name="heart" size={size} color={color}></AntDesign>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <AntDesign name="user" size={size} color={color}></AntDesign>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
