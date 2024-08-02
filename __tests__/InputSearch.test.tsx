import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import App from '../App';
import {ReactTestInstance} from 'react-test-renderer';

describe(App, () => {
  let inputNode: ReactTestInstance;

  it('Should exists input to search', async () => {
    render(<App />);
    inputNode = screen.getByPlaceholderText('Buscar');
    expect(inputNode).toBeOnTheScreen();
  });

  it('Should write in input text and wait one element', async () => {
    const textToSearch = 'A Game of Thrones';

    render(<App />);
    inputNode = screen.getByPlaceholderText('Buscar');
    expect(inputNode.props.value).toBe('');

    fireEvent.changeText(inputNode, textToSearch);

    expect(inputNode.props.value).toBe(textToSearch);

    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();

    //expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('Should write not match value and show nothing on list', async () => {
    const textToSearch = 'Sample';

    render(<App />);
    inputNode = screen.getByPlaceholderText('Buscar');

    fireEvent.changeText(inputNode, textToSearch);

    try {
      await screen.findByText('Libros:', {exact: false});
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.message).toContain('Unable to find an element with text');
    }
  });
});
