import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  type?: 'PRIMARY' | 'DEFAULT' | 'SUCCESS';
}

export const Button = ({label, onPress, type = 'DEFAULT'}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        type === 'PRIMARY' && styles.primary,
        type === 'DEFAULT' && styles.default,
        type === 'SUCCESS' && styles.success,
      ]}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  primary: {
    backgroundColor: '#007bff',
  },
  default: {
    backgroundColor: '#ccc',
  },
  success: {
    backgroundColor: '#02874a',
  },
});
