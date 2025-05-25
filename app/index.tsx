import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native'
import {
  CardDay,
  DailyRecord,
  PressureData,
  WeekDays,
} from '../src/components/card_day'
import { SetDataModal } from '../src/components/set_data_modal'
import { useEffect, useState } from 'react'
import { Input } from '../src/components/input'
import {
  clearPressureData,
  loadPressureData,
  savePressureData,
} from '../src/services/storage'

const diasDaSemana: WeekDays[] = ['1', '2', '3', '4', '5', '6', '7']

export default function Home() {
  const [pressureData, setPressureData] = useState<PressureData>({})
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState<WeekDays>('1')

  const [systolicMorning, setSystolicMorning] = useState<number>()
  const [diastolicMorning, setDiastolicMorning] = useState<number>()
  const [systolicNight, setSystolicNight] = useState<number>()
  const [diastolicNight, setDiastolicNight] = useState<number>()
  const [date, setDate] = useState('')

  function handleOpenModal(dataByDay: DailyRecord, weekDay: WeekDays) {
    setSelectedDay(weekDay)
    setSystolicMorning(dataByDay.morning?.systolic || 0)
    setDiastolicMorning(dataByDay.morning?.diastolic || 0)

    setSystolicNight(dataByDay.night?.systolic || 0)
    setDiastolicNight(dataByDay.night?.diastolic || 0)
    setDate(dataByDay.date)
    setModalIsVisible(true)
  }

  function handleSaveMeasurement() {
    const newDayData: DailyRecord = {
      date,
    }

    if ((systolicMorning || 0) > 0 || (diastolicMorning || 0) > 0) {
      newDayData.morning = {
        systolic: systolicMorning || 0,
        diastolic: diastolicMorning || 0,
      }
    }

    if ((systolicNight || 0) > 0 || (diastolicNight || 0) > 0) {
      newDayData.night = {
        systolic: systolicNight || 0,
        diastolic: diastolicNight || 0,
      }
    }

    const newData: PressureData = {
      ...pressureData,
      [selectedDay]: newDayData,
    }

    setPressureData(newData)
    savePressureData(newData)

    setModalIsVisible(false)
  }

  function handleClearData() {
    clearPressureData()
    loadPressureData().then((data) => setPressureData(data))
  }

  useEffect(() => {
    loadPressureData().then((data) => setPressureData(data))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.pageTitle}>
          Monitorização Residencial da Pressão Arterial
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {diasDaSemana.map((day) => {
          return (
            <CardDay
              data={pressureData}
              weekDay={day}
              key={day}
              openModal={handleOpenModal}
            />
          )
        })}
      </ScrollView>

      <View style={styles.footerView}>
        <TouchableOpacity style={styles.saveButton} onPress={handleClearData}>
          <Text style={styles.saveButtonText}>Limpar Histórico</Text>
        </TouchableOpacity>
      </View>

      <SetDataModal
        visible={modalIsVisible}
        onClose={() => setModalIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalView}>
            <View style={styles.modalHeaderView}>
              <Text style={styles.modalTitle}>Dia {selectedDay}</Text>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>Data</Text>
              <Input
                value={date}
                onChangeText={setDate}
                placeholder="dd/mm/aaaa"
              />
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>Manhã</Text>
              <Input
                label="Sistólica"
                value={String(systolicMorning)}
                onChangeText={(value) => setSystolicMorning(Number(value))}
                keyboardType="numeric"
              />
              <Input
                label="Diastólica"
                value={String(diastolicMorning)}
                onChangeText={(value) => setDiastolicMorning(Number(value))}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalSubtitle}>Tarde</Text>
              <Input
                label="Sistólica"
                value={String(systolicNight)}
                onChangeText={(value) => setSystolicNight(Number(value))}
                keyboardType="numeric"
              />
              <Input
                label="Diastólica"
                value={String(diastolicNight)}
                onChangeText={(value) => setDiastolicNight(Number(value))}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSaveMeasurement()}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </SetDataModal>
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerView: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    width: '75%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  modalHeaderView: {
    flexDirection: 'row',
  },
  modalContent: {
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b81b1b',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerView: {
    paddingTop: 20,
  },
})
