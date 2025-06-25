// __tests__/useTheme.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { ThemeProvider, useTheme, lightTheme, darkTheme } from '../src/context/ThemeContext';
// Importe apenas o que realmente usa no mock ou no teste direto, removendo NativeModules daqui
import { Appearance, StyleSheet, Platform, Dimensions } from 'react-native';

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
    flatten: jest.fn((style) => style),
  },
  Appearance: {
    getColorScheme: jest.fn(), // Mock para controlar o valor retornado
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

describe('useTheme', () => {
  // Antes de cada teste, configura o mock para o tema padrão 'light' e limpa chamadas
  beforeEach(() => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    jest.clearAllMocks();
  });

  // Após cada teste, restaura os mocks para isolamento
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Teste 1: Verifica se o hook lança um erro quando usado fora do ThemeProvider
  it('deve lançar um erro se não for usado dentro de um ThemeProvider', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe('useTheme must be used within a ThemeProvider');
  });

  // Teste 2: Verifica o estado inicial (tema claro padrão) e a função de alternar
  it('deve fornecer o tema claro padrão e a função de alternar', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('light');
    expect(result.current.currentTheme).toEqual(lightTheme);
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  // Teste 3: Alternar tema de claro para escuro
  it('deve alternar o tema de claro para escuro', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);
  });

  // Teste 4: Alternar tema de escuro para claro
  it('deve alternar o tema de escuro para claro', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark'); // Simula sistema no dark
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.themeName).toBe('light');
    expect(result.current.currentTheme).toEqual(lightTheme);
  });

  // Teste 5: Inicialização com tema escuro do sistema
  it('deve inicializar com o tema escuro do sistema se detectado', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);
  });

  // Teste 6: Reagir a mudanças no tema do sistema
  it('deve reagir a mudanças no tema do sistema', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('light');

    // Recupera o callback que foi registrado para o listener de mudança de tema
    const changeListenerCallback = (Appearance.addChangeListener as jest.Mock).mock.calls[0][0];

    act(() => {
      changeListenerCallback({ colorScheme: 'dark' });
    });

    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);

    act(() => {
      changeListenerCallback({ colorScheme: 'light' });
    });

    expect(result.current.themeName).toBe('light');
    expect(result.current.currentTheme).toEqual(lightTheme);
  });
});