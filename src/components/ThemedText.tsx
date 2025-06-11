// src/components/ThemedText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, children, ...rest }) => {
  const { currentTheme } = useTheme();
  return (
    <Text
      style={[{ color: currentTheme.textColor }, style]} //passando a cor aqui
      {...rest} //vou passar outras orops
    >
      {children}
    </Text>
  );
};

export default ThemedText;