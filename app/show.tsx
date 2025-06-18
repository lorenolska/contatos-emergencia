import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FIREBASE_URL = 'https://contatos-emergencia-default-rtdb.firebaseio.com';

type Contact = {
  nome: string;
  telefone: string;
  relacao: string;
};

export default function ShowContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<{ id: string; data: Contact }[]>([]);

  const loadContacts = async () => {
    try {
      const response = await fetch(`${FIREBASE_URL}/contacts.json`);
      const data = await response.json();

      if (data) {
        // data vem como objeto: { id1: {...}, id2: {...} }
        const contactsArray = Object.entries(data).map(([id, contact]) => ({
          id,
          data: contact as Contact,
        }));

        setContacts(contactsArray);
      } else {
        setContacts([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar contatos');
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  const deleteContact = async (id: string) => {
    try {
      const response = await fetch(`${FIREBASE_URL}/contacts/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar contato');
      }

      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      Alert.alert('Erro', 'Falha ao deletar contato');
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente deletar este contato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => deleteContact(id) },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (id: string) => {
    router.push({
      pathname: '/edit',
      params: { id },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contatos de Emergência</Text>

      {contacts.length === 0 && <Text>Nenhum contato encontrado.</Text>}

      {contacts.map(({ id, data }) => (
        <View key={id} style={styles.card}>
          <Text style={styles.name}>{data.nome}</Text>
          <Text>📞 {data.telefone}</Text>
          <Text>👥 {data.relacao}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEdit(id)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(id)}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  card: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 15 },
  name: { fontWeight: 'bold', fontSize: 18 },
  buttonsRow: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
  button: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  editButton: { backgroundColor: '#007AFF' },
  deleteButton: { backgroundColor: '#FF3B30' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
