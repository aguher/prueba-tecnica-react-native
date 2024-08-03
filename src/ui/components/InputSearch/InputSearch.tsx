/* eslint-disable react-hooks/exhaustive-deps */
import {debounce} from 'lodash';
import {useCallback, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface InputSearchProps {
  onChangeText: (value: string) => void;
  placeholder: string;
}

export const InputSearch = ({onChangeText, placeholder}: InputSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onChange = (value: string) => {
    setSearchQuery(value);
    onChangeText(value);
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce(query => {
      onChangeText(query);
    }, 500),
    [],
  );

  return (
    <TextInput
      testID="input-search"
      placeholder={placeholder}
      value={searchQuery}
      onChangeText={onChange}
      style={styles.searchInput}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
});
