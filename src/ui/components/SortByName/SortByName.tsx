import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface SortByNameProps {
  isAsc: boolean;
  onSort: () => void;
}

export const SortByName = ({isAsc, onSort}: SortByNameProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onSort}>
      <Text>Ordenar {isAsc ? '▲' : '▼'} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
});
