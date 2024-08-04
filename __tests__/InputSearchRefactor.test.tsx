import {fireEvent, screen, waitFor} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {renderScreen} from '@testUtils/navigator.utils';

describe('Home', () => {
  let inputNode: ReactTestInstance;

  it('Should exists input to search', async () => {
    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');
    expect(inputNode).toBeOnTheScreen();
  });

  it('Should write in input text and wait one element', async () => {
    const textToSearch = 'A Game of Thrones';

    renderHome();
    inputNode = screen.getByPlaceholderText('Buscar');
    expect(inputNode.props.value).toBe('');
    fireEvent.changeText(inputNode, textToSearch);
    await waitFor(() => {
      expect(inputNode.props.value).toBe(textToSearch);
    });
    const loadingNode = screen.getByTestId('loading');

    expect(loadingNode).toBeOnTheScreen();

    const dataText = await screen.findByText(/Libros: 1/i, {exact: false});
    expect(dataText).toBeOnTheScreen();
  });

  it('Should write not match value and show nothing on list', async () => {
    const textToSearch = 'Sample';

    renderHome();
    inputNode = screen.getByTestId('input-search');
    fireEvent.changeText(inputNode, textToSearch);

    try {
      await screen.findByText('Libros:', {exact: false});
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.message).toContain('Unable to find an element with text');
    }
  });
});

const renderHome = () => renderScreen('Home');
