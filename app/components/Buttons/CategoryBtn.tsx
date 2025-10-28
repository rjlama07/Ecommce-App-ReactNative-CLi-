import { StyleSheet, Text, Pressable } from 'react-native';
import React, { FC } from 'react';

interface Props {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryBtn: FC<Props> = props => {
  return (
    <Pressable
      style={[
        styles.commonStyles,
        props.isSelected ? styles.activeCategoryTab : styles.categoryTab,
      ]}
      onPress={props.onPress}
    >
      <Text style={props.isSelected ? styles.activeLabel : styles.label}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default CategoryBtn;

const styles = StyleSheet.create({
  commonStyles: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  categoryTab: {
    backgroundColor: '#edf4ff',
  },
  activeCategoryTab: {
    backgroundColor: 'black',
  },
  label: {
    color: 'black',
  },
  activeLabel: {
    color: 'white',
  },
});
