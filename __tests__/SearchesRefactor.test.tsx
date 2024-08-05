import {Book} from '@core/Book';
import {fireEvent, screen} from '@testing-library/react-native';

import {renderScreenContext} from '@testUtils/navigator.utils';
import {ReactTestInstance} from 'react-test-renderer';
import MainApp from 'ui/MainApp';
const ISBN = '978-0553103540-no-recent';
describe(MainApp, () => {
  let inputNode: ReactTestInstance;

  it('Should click over a book and see detail info', async () => {
    const textToSearch = 'A Game of Thrones';

    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');

    fireEvent.changeText(inputNode, textToSearch);
    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();
    const element = screen.getByTestId(ISBN);
    fireEvent.press(element);
    const detailText = await screen.findByText(/Autor: George R. R. Martin/i);

    expect(detailText).toBeOnTheScreen();
  });

  it('Should close button and not show details', async () => {
    const textToSearch = 'A Game of Thrones';

    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');

    fireEvent.changeText(inputNode, textToSearch);
    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();
    const element = screen.getByTestId(ISBN);
    fireEvent.press(element);
    await screen.findByText(/Autor: George R. R. Martin/i);

    const closeButton = screen.getByText('Cerrar');
    fireEvent.press(closeButton);

    try {
      await screen.findByText(/Autor: George R. R. Martin/i);
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.message).toContain('Unable to find an element with text');
    }
  });

  it('Should show button to open API', async () => {
    const textToSearch = 'A Game of Thrones';

    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');

    fireEvent.changeText(inputNode, textToSearch);
    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();
    const element = screen.getByTestId(ISBN);
    fireEvent.press(element);
    await screen.findByText(/Autor: George R. R. Martin/i);

    const apiButton = screen.getByText('Abrir API en el navegador');
    fireEvent.press(apiButton);
  });
});
const favorites: Book[] = [];

const renderHome = () =>
  renderScreenContext('Home', {
    recents: [],
    favorites,
    addRecent: () => {},
    toggleFavorites: () => {},
    isFavorite: _ => false,
    isSortingAsc: true,
    onSort: () => {},
  });
