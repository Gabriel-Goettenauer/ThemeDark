import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { ThemeProvider, useTheme, lightTheme, darkTheme } from '../src/context/ThemeContext';
import { Appearance, StyleSheet, Platform, Dimensions } from 'react-native';

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
    getColorScheme: jest.fn(), 
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
  beforeEach(() => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  
  it('deve lançar um erro se não for usado dentro de um ThemeProvider', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe('useTheme must be used within a ThemeProvider');
  });

  it('deve fornecer o tema claro padrão e a função de alternar', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('light');
    expect(result.current.currentTheme).toEqual(lightTheme);
    expect(typeof result.current.toggleTheme).toBe('function');
  });

  it('deve alternar o tema de claro para escuro', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);
  });

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

  it('deve inicializar com o tema escuro do sistema se detectado', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('dark');

    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('dark');
    expect(result.current.currentTheme).toEqual(darkTheme);
  });

  it('deve reagir a mudanças no tema do sistema', () => {
    (Appearance.getColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider });

    expect(result.current.themeName).toBe('light');

    
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