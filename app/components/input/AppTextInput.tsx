import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, { FC } from 'react';

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string[];
  suffixIcon?: React.ReactNode;
}

const AppTextInput: FC<AppTextInputProps> = ({
  label,
  suffixIcon,
  error,
  ...rest
}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.inputContiner}>
          <TextInput style={styles.textInput} {...rest} />
          {suffixIcon && suffixIcon}
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#dedede',
  },
  inputContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 12,
    flex: 1,
  },
  inputLabel: {
    fontSize: 10,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  error: {
    fontSize: 12,
    color: 'green',
    marginTop: -10,
    marginLeft: 5,
  },
});
