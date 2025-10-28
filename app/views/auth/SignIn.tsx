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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigator/AuthStack';
import axios, { AxiosError } from 'axios';
import client, { NetworkRoutes } from '../../api/client';
import { saveToLocalStorage } from '../../utils/localSorage';
import LocalStorageKey from '../../constants/localstorage';
import { useAuth } from '../../context/AuthProvider';

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });
  type errorType = Record<string, string[] | undefined>;
  const [error, setError] = useState<errorType>({});
  const [singleError, setSingleError] = useState('');
  const hasEnteredPassword = signInInfo.password.length > 0;
  const authProvider = useAuth();
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

  async function handleSumit() {
    try {
      setError({});
      setSingleError('');
      const response = await client.post(NetworkRoutes.login, signInInfo);
      console.log(response);

      console.log(JSON.stringify(response.data, null, 3));
      await saveToLocalStorage(LocalStorageKey.token, response.data.token);
      authProvider.setAuthenticate();
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
      <AppTextInput
        label="Email"
        defaultValue="riteshlama5@gmail.com"
        placeholder="email@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={signInInfo.email}
        error={error.email}
        onChangeText={email => {
          setSignInInfo(previouse => {
            return { ...previouse, email };
          });
        }}
      />
      <AppTextInput
        label="Password"
        defaultValue="riteshlama5@gmail.com"
        secureTextEntry={!showPassword}
        placeholder="*************"
        autoCapitalize="none"
        suffixIcon={passwordSuffix}
        error={error.password}
        value={signInInfo.password}
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
        title="Login"
      />
      <View style={styles.dontHaveAccount}>
        <Text style={styles.navLink}>Don't have an Account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('signup');
          }}
        >
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
