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
      <ThemedButton title="Pergunta 1" onPress={() => alert('Ação 1!')} />
      <ThemedButton title="Pergunta 2" onPress={() => alert('Ação 2!')} />

      <ThemedText style={styles.sectionTitle}>Conteúdo Adicional</ThemedText>
      <ThemedText style={styles.paragraph}>
        Prefere tema claro ?
      </ThemedText>
      <ThemedText style={styles.paragraph}>
       Prefere tema escuro ?
      </ThemedText>
    </ScrollView>
  );
};

export default DetailsScreen;