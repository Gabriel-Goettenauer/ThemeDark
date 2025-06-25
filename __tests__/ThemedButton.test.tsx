// __tests__/ThemedButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemedButton from '../src/components/ThemedButton';
import { ThemeProvider, lightTheme, darkTheme } from '../src/context/ThemeContext';
import { Appearance, TextStyle, ViewStyle, StyleSheet, Platform, Dimensions, NativeModules } from 'react-native';

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
    getColorScheme: jest.fn(() => 'light'),
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

describe('ThemedButton', () => {
  // Garante que o mock do tema é resetado para 'light' antes de CADA teste
  beforeEach(() => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    jest.clearAllMocks(); // Limpa chamadas de mocks entre os testes
  });

  // Restaura os mocks originais após CADA teste
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve renderizar o botão com título e cores do tema claro por padrão', () => {
    const onPressMock = jest.fn();
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <ThemedButton title="Clique Aqui" onPress={onPressMock} testID="themed-button" />
      </ThemeProvider>
    );

    const buttonText = getByText('Clique Aqui');
    expect(buttonText).toBeDefined();

    const buttonElement = getByTestId('themed-button');
    expect(buttonElement).toHaveStyle({ backgroundColor: lightTheme.primaryButtonColor });
    expect(buttonText).toHaveStyle({ color: lightTheme.primaryButtonTextColor });
  });

  it('deve renderizar o botão com as cores do tema escuro quando o tema é escuro', () => {
    // Sobrescreve o mock apenas para este teste
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');
    const onPressMock = jest.fn();
    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <ThemedButton title="Botão Escuro" onPress={onPressMock} testID="themed-button-dark" />
      </ThemeProvider>
    );

    const buttonText = getByText('Botão Escuro');
    const buttonElement = getByTestId('themed-button-dark');
    expect(buttonElement).toHaveStyle({ backgroundColor: darkTheme.primaryButtonColor });
    expect(buttonText).toHaveStyle({ color: darkTheme.primaryButtonTextColor });
  });

  it('deve chamar o callback onPress quando o botão é pressionado', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <ThemedButton title="Pressione-me" onPress={onPressMock} />
      </ThemeProvider>
    );

    const buttonText = getByText('Pressione-me');
    fireEvent.press(buttonText);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar estilos adicionais passados como props', () => {
    const estiloPersonalizadoBotao: ViewStyle = { margin: 10, borderWidth: 1 };
    const estiloPersonalizadoTexto: TextStyle = { fontSize: 18, textTransform: 'uppercase' };
    const onPressMock = jest.fn();

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <ThemedButton
          title="Estilizado Personalizado"
          onPress={onPressMock}
          style={estiloPersonalizadoBotao}
          textStyle={estiloPersonalizadoTexto}
          testID="custom-button"
        />
      </ThemeProvider>
    );

    const buttonText = getByText('Estilizado Personalizado');
    const buttonElement = getByTestId('custom-button');

    expect(buttonElement).toHaveStyle({
      backgroundColor: lightTheme.primaryButtonColor,
      ...estiloPersonalizadoBotao,
    });
    expect(buttonText).toHaveStyle({
      color: lightTheme.primaryButtonTextColor,
      ...estiloPersonalizadoTexto,
    });
  });
});