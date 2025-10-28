import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/auth/SignIn';
import SignUn from '../views/auth/SignUp';
import Home from '../views/auth/AuthenticatedRoutes/Home';
import { TabNavigator } from './BottomNav';

export type AuthStackParamList = {
  login: undefined;
  signup: undefined;
  bottomNav: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={SignIn} />
      <Stack.Screen name="signup" component={SignUn} />
    </Stack.Navigator>
  );
}

export default AuthStack;
