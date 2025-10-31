import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { StyleProp } from 'react-native';
import AppColors from '../../constants/AppColors';

interface Props extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const PrimaryButton: FC<Props> = ({
  title,
  backgroundColor,
  isLoading = false,
  textStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        backgroundColor
          ? {
              backgroundColor: backgroundColor,
            }
          : {},
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.primaryColor,
    padding: 12,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
