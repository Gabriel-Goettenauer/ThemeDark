// src/components/ThemedText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native'; // Importe StyleSheet aqui
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  children: React.ReactNode;
}

const ThemedText: React.FC<ThemedTextProps> = ({ style, children, ...rest }) => {
  const { currentTheme } = useTheme();
  
  // CORREÇÃO: Usar StyleSheet.flatten para combinar os estilos.
  // Isso garante que o estilo final seja um objeto plano, como o toHaveStyle espera.
  const combinedStyle = StyleSheet.flatten([
    { color: currentTheme.textColor },
    style,
  ]);

  return (
    <Text
      style={combinedStyle} // Passa o estilo combinado e plano
      {...rest}
    >
      {children}
    </Text>
  );
};

export default ThemedText;