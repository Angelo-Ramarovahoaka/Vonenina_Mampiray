import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

export default function CustomButton({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  activeOpacity = 0.8 
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.garnet.secondary, // Rouge foncé
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    width: width * 0.8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1,
  },
});