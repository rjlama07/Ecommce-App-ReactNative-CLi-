import { StyleSheet } from 'react-native';
import React from 'react';
import SignIn from './app/views/auth/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignUp from './app/views/auth/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './app/navigator/AuthStack';
import RootNavigator from './app/navigator/RootNavigator';
import AuthProvider from './app/context/AuthProvider';
import CartProvider from './app/context/CartProvider';

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <CartProvider>
          <RootNavigator></RootNavigator>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
