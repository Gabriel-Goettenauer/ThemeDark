// src/screens/DetailsScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { useTheme } from '../context/ThemeContext';
import ThemedText from '../components/ThemedText';
import ThemedButton from '../components/ThemedButton';
import { RootStackParamList } from '../navigation/types';

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const { currentTheme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: currentTheme.headerBackgroundColor,
      },
      headerTintColor: currentTheme.headerTextColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      title: 'Detalhes da Aplicação',
    });
  }, [navigation, currentTheme]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    paragraph: {
      fontSize: 16,
      marginBottom: 10,
      lineHeight: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <ThemedText style={styles.title}>Mais Informações</ThemedText>

      <ThemedText style={styles.sectionTitle}>Funcionalidades</ThemedText>
      <ThemedText style={styles.paragraph}>
        - Gerenciamento de tema Light/Dark usando React Context API e TypeScript.
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>Exemplo de Botões</ThemedText>
      <ThemedButton title="Botão de Ação 1" onPress={() => alert('Ação 1!')} />
      <ThemedButton title="Botão de Ação 2" onPress={() => alert('Ação 2!')} />

      <ThemedText style={styles.sectionTitle}>Conteúdo Adicional</ThemedText>
      <ThemedText style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ThemedText>
      <ThemedText style={styles.paragraph}>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
      </ThemedText>
    </ScrollView>
  );
};

export default DetailsScreen;