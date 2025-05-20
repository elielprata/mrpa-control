import React from 'react'
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'

type InputProps = {
  label?: string
  value: string
  onChangeText: (text: string) => void
  error?: string
} & TextInputProps

export function Input({
  label,
  value,
  onChangeText,
  error,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
})
