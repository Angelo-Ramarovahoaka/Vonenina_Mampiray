import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  instructionPlaceholder?: string; // The instruction text to show when focused
  error?: string;
  containerStyle?: any;
}

export default function CustomTextInput({ 
  label, 
  instructionPlaceholder,
  error, 
  containerStyle, 
  style,
  placeholder,
  ...props 
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleChangeText = (text: string) => {
    setHasValue(text.length > 0);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  // Check if label should be floating (focused or has value)
  const shouldFloat = isFocused || hasValue;

  // Get the placeholder text
  const getPlaceholder = () => {
    if (shouldFloat && instructionPlaceholder) {
      return instructionPlaceholder;
    }
    if (!shouldFloat && label) {
      return label;
    }
    return placeholder || '';
  };

  // Get the placeholder color based on state
  const getPlaceholderColor = () => {
    if (shouldFloat && instructionPlaceholder) {
      return Colors.black;
    }
    return Colors.garnet.primary;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Floating Label */}
      {shouldFloat && label && (
        <Text style={[styles.floatingLabel, isFocused && styles.focusedLabel]}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input, 
          error && styles.inputError, 
          shouldFloat && styles.inputWithFloatingLabel,
          style
        ]}
        placeholderTextColor={getPlaceholderColor()}
        placeholder={getPlaceholder()}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
    position: 'relative',
  },
  input: {
    backgroundColor: Colors.garnet.tertiary,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: width * 0.85,
  },
  inputWithFloatingLabel: {
    paddingTop: 20, 
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: 12,
    color: Colors.black,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  focusedLabel: {
    color: Colors.garnet.primary, 
  },
  inputError: {
    borderColor: Colors.red,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 5,
  },
});