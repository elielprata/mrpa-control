import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = '@pressure_data'

export async function savePressureData(data: object) {
  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
  } catch (error) {
    console.error('Erro ao salvar os dados:', error)
  }
}

export async function loadPressureData() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
    return jsonValue != null ? JSON.parse(jsonValue) : {}
  } catch (error) {
    console.error('Erro ao carregar os dados:', error)
    return {}
  }
}

export async function clearPressureData() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Erro ao limpar os dados:', error)
  }
}
