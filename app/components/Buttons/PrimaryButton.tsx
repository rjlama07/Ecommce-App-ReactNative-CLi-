import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { StyleProp } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  backgroundColor?: string;
  textStyle?: StyleProp<TextStyle>;
}

const PrimaryButton: FC<Props> = ({
  title,
  backgroundColor,
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
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
