import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/auth/SignIn';
import SignUn from '../views/auth/SignUp';
import Home from '../views/auth/AuthenticatedRoutes/Home';
import { TabNavigator } from './BottomNav';
import ProductDetails from '../views/auth/AuthenticatedRoutes/ProductDetails';
import Fav from '../views/auth/AuthenticatedRoutes/Fav';

export type FavScreenParams = {
  favouriteScreen: undefined;
  product: { id: number | string };
};

const Stack = createStackNavigator<FavScreenParams>();

function FavoouriteScrenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="favouriteScreen" component={Fav} />
      <Stack.Screen name="product" component={ProductDetails} />
    </Stack.Navigator>
  );
}

export default FavoouriteScrenStack;
