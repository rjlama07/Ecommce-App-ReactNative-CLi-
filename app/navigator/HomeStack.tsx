import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/auth/SignIn';
import SignUn from '../views/auth/SignUp';
import Home from '../views/auth/AuthenticatedRoutes/Home';
import { TabNavigator } from './BottomNav';
import ProductDetails from '../views/auth/AuthenticatedRoutes/ProductDetails';

export type HomeScreenParamList = {
  home: undefined;
  product: { id: number | string };
};

const Stack = createStackNavigator<HomeScreenParamList>();

function HomeNavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="product" component={ProductDetails} />
    </Stack.Navigator>
  );
}

export default HomeNavigationStack;
