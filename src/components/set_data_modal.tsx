import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
} from 'react-native'

type SetDataModalProps = ModalProps & {
  onClose: () => void
  children: React.ReactNode
}

export function SetDataModal({
  onClose,
  children,
  ...rest
}: SetDataModalProps) {
  return (
    <Modal style={styles.container} onRequestClose={onClose} {...rest}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {children}
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
  },
})
