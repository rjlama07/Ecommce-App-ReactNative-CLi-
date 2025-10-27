import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';

interface Props extends TouchableOpacityProps {
  title: string;
}

const PrimaryButton: FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} {...rest}>
      <Text style={styles.text}>{title}</Text>
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
