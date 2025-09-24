import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  instructionPlaceholder?: string; // The instruction text to show when focused
  error?: string;
  containerStyle?: any;
  asButton?: boolean; // If true, shows as button until clicked
  showSuccess?: boolean; // If true, shows success checkmark
}

export default function CustomTextInput({ 
  label, 
  instructionPlaceholder,
  error, 
  containerStyle, 
  style,
  placeholder,
  secureTextEntry,
  asButton = false,
  showSuccess = false,
  ...props 
}: CustomTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [isActivated, setIsActivated] = useState(!asButton); // If asButton is true, starts as inactive

  const handleFocus = (e: any) => {
    setIsFocused(true);
    setHasBeenFocused(true);
    setIsActivated(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleButtonPress = () => {
    if (asButton && !isActivated) {
      setIsActivated(true);
      setIsFocused(true);
      setHasBeenFocused(true);
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
    const shouldFloat = isFocused || hasValue || hasBeenFocused || (secureTextEntry && isPasswordVisible);

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

  const HandleVisibilityPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Floating Label */}
      {shouldFloat && label && (
        <Text style={styles.floatingLabel}>
          {label}
        </Text>
      )}
      
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input, 
            error && styles.inputError, 
            shouldFloat && styles.inputWithFloatingLabel,
            secureTextEntry && styles.inputWithIcon,
            style
          ]}
          placeholderTextColor={getPlaceholderColor()}
          placeholder={getPlaceholder()}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          {...props}
        />
        
        {/* Password Toggle Icon */}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={HandleVisibilityPassword}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={Colors.black}
            />
          </TouchableOpacity>
        )}
      </View>
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
  inputWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
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
  inputWithIcon: {
    paddingRight: 45, // Extra space for the icon
  },
  passwordToggle: {
    position: 'absolute',
    right: (width * 0.15) / 2 + 15, // Positioned inside the input
    top: 15,
    padding: 5,
  },
  inputWithFloatingLabel: {
    paddingTop: 20, 
  },
  floatingLabel: {
    color: Colors.garnet.primary,
    position: 'absolute',
    left: 15,
    top: 8,
    fontSize: 12,
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