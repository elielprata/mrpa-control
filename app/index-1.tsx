import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MRPA</Text>

      <Text style={styles.periodsTitle}>Acompanhamentos</Text>
      <Link href={'/acc'}>
        <View style={[styles.card, styles.shadowProp]}>
          <Text>Acompanhamento 1</Text>
          <Text>Iniciado em: 27/04/2025</Text>
          <Text>Situação: Incompleto</Text>
        </View>
      </Link>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  periodsTitle: {
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})
