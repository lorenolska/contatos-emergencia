import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const FIREBASE_URL = 'https://contatos-emergencia-default-rtdb.firebaseio.com';

export default function AddContact() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [relacao, setRelacao] = useState('');

  const handleSave = async () => {
    if (!nome || !telefone || !relacao) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const newContact = { nome, telefone, relacao };

    try {
      const response = await fetch(`${FIREBASE_URL}/contacts.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar contato');
      }

      Alert.alert('Sucesso', 'Contato salvo!');
      router.push('/show');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar contato');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Contato</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Relação"
        value={relacao}
        onChangeText={setRelacao}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15, marginBottom: 15 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
});
