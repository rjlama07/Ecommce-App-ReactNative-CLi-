import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/input/AppTextInput';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });
  const hasEnteredPassword = signInInfo.password.length > 0;
  const passwordSuffix = hasEnteredPassword ? (
    <Text
      onPress={() => {
        setShowPassword(pre => !pre);
      }}
      style={styles.passwordSuffix}
    >
      {showPassword ? 'Hide' : 'Show'}
    </Text>
  ) : undefined;

  return (
    <SafeAreaView style={{ paddingHorizontal: 16, gap: 15 }}>
      <AppTextInput
        label="Email"
        placeholder="email@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={signInInfo.email}
        onChangeText={email => {
          setSignInInfo(previouse => {
            return { ...previouse, email };
          });
        }}
      />
      <AppTextInput
        label="Password"
        secureTextEntry={!showPassword}
        placeholder="*************"
        autoCapitalize="none"
        suffixIcon={passwordSuffix}
        value={signInInfo.password}
        onChangeText={password => {
          setSignInInfo(previouse => {
            return { ...previouse, password };
          });
        }}
      />
      <PrimaryButton
        onPress={() => {
          console.log(signInInfo);
        }}
        title="Login"
      />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  passwordSuffix: {
    fontSize: 10,
    color: 'blue',
  },
});
