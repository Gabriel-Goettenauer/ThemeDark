// __tests__/ThemedText.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import ThemedText from '../src/components/ThemedText';
import { ThemeProvider, lightTheme, darkTheme } from '../src/context/ThemeContext';
import { Appearance, TextStyle, StyleSheet, Platform, Dimensions, NativeModules } from 'react-native';

// Mock abrangente de react-native para ambiente Jest
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn((options) => options.ios || options.default),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
  StyleSheet: {
    create: jest.fn((styles) => styles),
    // CORREÇÃO: Este mock de flatten é crucial. Ele simula como o StyleSheet.flatten
    // combinaria arrays de estilos em um único objeto.
    flatten: jest.fn((style) => {
      if (Array.isArray(style)) {
        return style.reduce((acc, current) => ({ ...acc, ...current }), {});
      }
      return style;
    }),
  },
  Appearance: {
    getColorScheme: jest.fn(() => 'light'), // Padrão 'light' no mock global
    addChangeListener: jest.fn(() => ({ remove: jest.fn() })),
  },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  Image: 'Image',
  Animated: {
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  },
  NativeModules: {
    DevMenu: {},
    SourceCode: {},
    WebSocketModule: {},
    PlatformConstants: {},
  },
  TurboModuleRegistry: {
    getEnforcing: jest.fn((name) => {
      const problematicModules = ['DevMenu', 'SourceCode', 'WebSocketModule', 'PlatformConstants', 'Appearance', 'NativeDevSettings', 'UIManager'];
      if (problematicModules.includes(name)) {
        return {};
      }
      return jest.fn();
    }),
  },
}));

describe('ThemedText', () => {
  // Garante que o mock do tema é resetado para 'light' antes de CADA teste
  beforeEach(() => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    jest.clearAllMocks(); // Limpa chamadas de mocks entre os testes
  });

  // Restaura os mocks originais após CADA teste
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve renderizar o texto com as cores do tema claro por padrão', () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemedText>Olá Mundo</ThemedText>
      </ThemeProvider>
    );

    const textElement = getByText('Olá Mundo');
    expect(textElement).toBeDefined();
    expect(textElement).toHaveStyle({ color: lightTheme.textColor });
  });

  it('deve renderizar o texto com as cores do tema escuro quando o tema é escuro', () => {
    // Sobrescreve o mock apenas para este teste
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');

    const { getByText } = render(
      <ThemeProvider>
        <ThemedText>Olá Modo Escuro</ThemedText>
      </ThemeProvider>
    );

    const textElement = getByText('Olá Modo Escuro');
    expect(textElement).toBeDefined();
    expect(textElement).toHaveStyle({ color: darkTheme.textColor });
  });

  it('deve aplicar estilos adicionais passados como props', () => {
    const estiloPersonalizado: TextStyle = { fontSize: 20, fontWeight: 'bold' };
    const { getByText } = render(
      <ThemeProvider>
        <ThemedText style={estiloPersonalizado}>Texto Estilizado</ThemedText>
      </ThemeProvider>
    );

    const textElement = getByText('Texto Estilizado');
    expect(textElement).toHaveStyle({
      color: lightTheme.textColor, // A cor do tema é aplicada
      ...estiloPersonalizado,     // E os estilos personalizados são mesclados
    });
  });
});