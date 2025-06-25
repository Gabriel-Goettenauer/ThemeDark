// src/components/ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native'; // Importe StyleSheet aqui
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, children, ...rest }) => {
  const { currentTheme } = useTheme();
  
  const combinedStyle = StyleSheet.flatten([
    { color: currentTheme.textColor },
    style,
  ]);

  return (
    <Text
      style={combinedStyle} 
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;