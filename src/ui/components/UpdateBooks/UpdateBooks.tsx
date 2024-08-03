import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface UpdateBooksProps {
  onUpdate: () => void;
  label?: string;
}

export const UpdateBooks = ({
  onUpdate,
  label = 'Actualizar libros',
}: UpdateBooksProps) => {
  return (
    <TouchableOpacity onPress={onUpdate} style={styles.searchButton}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
});
