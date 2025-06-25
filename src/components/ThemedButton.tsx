// src/components/ThemedButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle } from 'react-native'; // Importe StyleSheet aqui
import { useTheme } from '../context/ThemeContext';

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ title, onPress, style, textStyle, ...rest }) => {
  const { currentTheme } = useTheme();
  const buttonCombinedStyle = StyleSheet.flatten([
    styles.button,
    { backgroundColor: currentTheme.primaryButtonColor },
    style,
  ]);

  const textCombinedStyle = StyleSheet.flatten([
    styles.buttonText,
    { color: currentTheme.primaryButtonTextColor },
    textStyle,
  ]);

  return (
    <TouchableOpacity
      style={buttonCombinedStyle} 
      onPress={onPress}
      {...rest}
    >
      <Text
        style={textCombinedStyle} 
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThemedButton;