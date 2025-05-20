import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

type CardDayProps = {
  data: PressureData
  openModal: (register: DailyRecord, weekDay: WeekDays) => void
  weekDay: WeekDays
}

export type Pressure = {
  systolic: number
  diastolic: number
}

export interface DailyRecord {
  date: string
  morning?: Pressure
  night?: Pressure
}

export type WeekDays = '1' | '2' | '3' | '4' | '5' | '6' | '7'

export type PressureData = {
  [dia in WeekDays]?: DailyRecord
}

export function CardDay({ data, openModal, weekDay, ...rest }: CardDayProps) {
  const dataByDay: DailyRecord = data[weekDay] || { date: '' }

  return (
    <View style={styles.container} {...rest}>
      <View style={styles.headerView}>
        <Text style={styles.dayTitle}>Dia {weekDay}</Text>
        <Text>{dataByDay?.date ?? '--/--/--'}</Text>
      </View>
      <View style={styles.measurementView}>
        <View style={styles.dayPeriodsView}>
          <Text style={styles.dayPeriodsTitle}>Manhã</Text>

          <Text
            style={[
              styles.measurementInfo,
              { color: dataByDay.morning ? '' : '#000' },
            ]}
          >
            {dataByDay.morning
              ? `${dataByDay.morning.systolic}/${dataByDay.morning.diastolic}`
              : 'Faltando'}
          </Text>
        </View>
        <View style={styles.dayPeriodsView}>
          <Text style={styles.dayPeriodsTitle}>Noite</Text>
          <Text
            style={[
              styles.measurementInfo,
              { color: dataByDay.night ? '#145a92' : '#000' },
            ]}
          >
            {dataByDay.night
              ? `${dataByDay.night.systolic}/${dataByDay.night.diastolic}`
              : 'Faltando'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addDataButton}
        onPress={() => openModal(dataByDay, weekDay)}
      >
        <Text style={styles.addDataButtonText}>Informar Dia {weekDay}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 5,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  measurementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayPeriodsView: {},
  dayPeriodsTitle: {
    fontSize: 16,
  },
  measurementInfo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#145a92',
  },
  addDataButton: {
    flex: 1,
    alignItems: 'center',
    marginTop: 8,
    padding: 10,
    backgroundColor: '#145a92',
    borderRadius: 10,
  },
  addDataButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})
