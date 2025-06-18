import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FIREBASE_URL = 'https://contatos-emergencia-default-rtdb.firebaseio.com';

export default function EditContact() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [relacao, setRelacao] = useState('');

  useEffect(() => {
    const loadContact = async () => {
      if (!id) return;

      try {
        const response = await fetch(`${FIREBASE_URL}/contacts/${id}.json`);
        const data = await response.json();

        if (data) {
          setNome(data.nome);
          setTelefone(data.telefone);
          setRelacao(data.relacao);
        } else {
          Alert.alert('Erro', 'Contato não encontrado');
          router.back();
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar contato');
        console.error(error);
      }
    };

    loadContact();
  }, [id]);

  const handleSave = async () => {
    if (!nome || !telefone || !relacao) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(`${FIREBASE_URL}/contacts/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, relacao }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar contato');
      }

      Alert.alert('Sucesso', 'Contato atualizado!');
      router.push('/show');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar contato');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Contato</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput placeholder="Relação" value={relacao} onChangeText={setRelacao} style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});
