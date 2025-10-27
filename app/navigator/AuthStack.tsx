import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/auth/SignIn';
import SignUn from '../views/auth/SignUp';
import Home from '../views/auth/AuthenticatedRoutes/Home';

export type AuthStackParamList = {
  login: undefined;
  signup: undefined;
  home: {
    profile: {
      name: string;
      email: string;
    };
  };
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
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}

export default AuthStack;
