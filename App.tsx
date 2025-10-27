import { StyleSheet } from 'react-native';
import React from 'react';
import SignIn from './app/views/auth/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <SignIn />
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
