/* eslint-disable testing-library/no-unnecessary-act */
import {fireEvent, screen, waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {act} from '@testing-library/react-native';

import {renderScreenContext} from '@testUtils/navigator.utils';
import {BOOK_MOCKED} from '@testUtils/mocked';

describe('Recents', () => {
  let inputNode: ReactTestInstance;

  it('Should check recents list', async () => {
    const textToSearch = 'A Game of Thrones';

    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');
    await act(async () => {
      fireEvent.changeText(inputNode, textToSearch);
      const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
      expect(dataText).toBeOnTheScreen();
      const element = screen.getByTestId('978-0553103540-no-recent');

      fireEvent.press(element);
      const closeButton = screen.getByText('Cerrar');
      fireEvent.press(closeButton);
      await waitFor(() => {
        const recentsText = screen.getByTestId('978-0553103540-recent');
        expect(recentsText).toBeOnTheScreen();
      });
    });
  });
});

const renderHome = () =>
  renderScreenContext('Home', {
    recents: [BOOK_MOCKED],
    favorites: [],
    addRecent: () => {},
    toggleFavorites: () => {},
    isFavorite: _ => true,
    isSortingAsc: true,
    onSort: () => {},
  });
