import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import App from '../App';
import {ReactTestInstance} from 'react-test-renderer';

describe(App, () => {
  let inputNode: ReactTestInstance;

  it('Should check recents list', async () => {
    const textToSearch = 'A Game of Thrones';

    render(<App />);
    inputNode = screen.getByPlaceholderText('Buscar');

    fireEvent.changeText(inputNode, textToSearch);
    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();
    const element = screen.getByTestId('978-0553103540-no-recent');

    fireEvent.press(element);
    const closeButton = screen.getByText('Cerrar');
    fireEvent.press(closeButton);
    const recentsText = screen.getByTestId('978-0553103540-recent');
    expect(recentsText).toBeOnTheScreen();
  });
});
