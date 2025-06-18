import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatos de Emergência</Text>

      <Link href="/add" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Contato</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/show" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver Contatos</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});
