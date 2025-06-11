// src/screens/HomeScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import ThemedText from '../components/ThemedText';
import ThemedButton from '../components/ThemedButton';
import { RootStackParamList } from '../navigation/types';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { currentTheme, toggleTheme, themeName } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: currentTheme.headerBackgroundColor,
      },
      headerTintColor: currentTheme.headerTextColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: 'Minha Aplicação Temática',
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
          <Ionicons
            name={themeName === 'light' ? 'moon-outline' : 'sunny-outline'}
            size={24}
            color={currentTheme.headerTextColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentTheme, toggleTheme, themeName]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.backgroundColor,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Bem-vindo!</ThemedText>
      <ThemedText style={styles.description}>
        Esta é a tela inicial da sua aplicação com gerenciamento de tema.
        Alterne entre os modos claro e escuro usando o botão no cabeçalho.
      </ThemedText>

      <ThemedButton
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  );
};

export default HomeScreen;