import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/input/AppTextInput';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { AuthStackParamList } from '../../navigator/AuthStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import client, { NetworkRoutes } from '../../api/client';
import { AxiosError } from 'axios';

const SignUn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  type errorType = Record<string, string[] | undefined>;
  const [error, setError] = useState<errorType>({});
  const [singleError, setSingleError] = useState('');
  const [signUpInfo, setSignInInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const hasEnteredPassword = signUpInfo.password.length > 0;
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

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  async function handleSumit() {
    try {
      setError({});
      setSingleError('');
      const response = await client.post(NetworkRoutes.singUp, signUpInfo);
      navigation.goBack();
      Alert.alert('Sucessfully created Account');
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.errors) {
          console.log(e.response?.data);
          setError(e.response?.data.errors);
        }
        if (e.response?.data.error) {
          console.log('this os error', e.response?.data.error);

          setSingleError(e.response?.data.error);
        }
      }
    }
  }

  useEffect(() => {
    if (singleError !== '') {
      Alert.alert('Oops', singleError);
    }
  }, [singleError]);
  return (
    <SafeAreaView style={{ paddingHorizontal: 16, gap: 15, flex: 1 }}>
      <View>
        <Text style={styles.title}>Welcome to Daraz</Text>
        <Text style={styles.subTitle}>Your perfect ecommerce platform</Text>
      </View>
      {singleError != '' && <Text>{singleError}</Text>}
      <AppTextInput
        label="Name"
        placeholder="John Doe"
        autoCapitalize="none"
        keyboardType="default"
        value={signUpInfo.name}
        error={error.name}
        onChangeText={name => {
          setSignInInfo(previouse => {
            return { ...previouse, name };
          });
        }}
      />
      <AppTextInput
        label="Email"
        placeholder="email@example.com"
        autoCapitalize="none"
        error={error.email}
        keyboardType="email-address"
        value={signUpInfo.email}
        onChangeText={email => {
          setSignInInfo(previouse => {
            return { ...previouse, email };
          });
        }}
      />
      <AppTextInput
        label="Password"
        error={error.password}
        secureTextEntry={!showPassword}
        placeholder="*************"
        autoCapitalize="none"
        suffixIcon={passwordSuffix}
        value={signUpInfo.password}
        onChangeText={password => {
          ///hide passwrod on empty
          if (password.length === 0) {
            setShowPassword(false);
          }
          setSignInInfo(previouse => {
            return { ...previouse, password };
          });
        }}
      />
      <PrimaryButton
        onPress={() => {
          handleSumit();
        }}
        title="Create New Account"
      />
      <View style={styles.dontHaveAccount}>
        <Text style={styles.navLink}>Already have an Account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.signIn}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUn;

const styles = StyleSheet.create({
  passwordSuffix: {
    fontSize: 10,
    color: 'blue',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 24,
  },
  dontHaveAccount: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navLink: {
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  signIn: {
    color: 'blue',
    opacity: 0.7,
  },
});
