import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {Button} from './Button';

const LABEL = 'Hola Mundo';
describe(Button, () => {
  let buttonNode: ReactTestInstance;

  it('Should render a label', async () => {
    render(<Button label={LABEL} onPress={() => {}} />);
    buttonNode = screen.getByText(LABEL);
    expect(buttonNode).toBeOnTheScreen();
  });

  it('Should call to onPress method', async () => {
    const mockJestFn = jest.fn();
    render(<Button label={LABEL} onPress={mockJestFn} />);
    buttonNode = screen.getByText(LABEL);

    fireEvent.press(buttonNode);
    expect(mockJestFn).toHaveBeenCalledTimes(1);
  });
});
