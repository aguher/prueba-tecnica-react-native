import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

import {UpdateBooks} from './UpdateBooks';

const TEST_LABEL = 'Test label';

describe(UpdateBooks, () => {
  let labelNode: ReactTestInstance;

  it('Should have a label passed by props', async () => {
    render(<UpdateBooks onUpdate={() => {}} label={TEST_LABEL} />);
    labelNode = screen.getByText(TEST_LABEL);
    expect(labelNode).toBeOnTheScreen();
  });

  it('Should call method when press over the label', async () => {
    const onPressMock = jest.fn();

    render(<UpdateBooks onUpdate={onPressMock} label={TEST_LABEL} />);
    labelNode = screen.getByText(TEST_LABEL);
    fireEvent.press(labelNode);
    await waitFor(() => {
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });
});
