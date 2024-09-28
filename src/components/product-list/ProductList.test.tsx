import { render, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/node';
import { productsUrl, products } from '../../constants';
import userEvent from '@testing-library/user-event';
import { ProductList } from './ProductList';

describe('render happy path', () => {
  beforeEach(() => {
    server.use(http.get(productsUrl, () => HttpResponse.json(products)));
  });

  it('should render a heading', () => {
    render(<ProductList />);

    expect(
      screen.queryByRole('heading', { name: /products/i }),
    ).toBeInTheDocument();
  });

  it('should render loading message', () => {
    render(<ProductList />);

    expect(
      screen.queryByRole('status', { name: /loading/i }),
    ).toBeInTheDocument();
  });

  it('should render list items with titles', async () => {
    render(<ProductList />);

    const list = await screen.findByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(products.length);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(new RegExp(`product${index + 1}`, 'i'));
    });
  });

  it('should render working filter input', async () => {
    const user = userEvent.setup();
    render(<ProductList />);

    await screen.findByRole('list');
    const input = screen.getByRole('textbox', { name: /keyword/i });

    expect(screen.getAllByRole('listitem')).toHaveLength(products.length);
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length);

    await user.type(input, 'ct1');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);

    await user.clear(input);
    expect(screen.getAllByRole('listitem')).toHaveLength(products.length);

    await user.type(input, 'CT1');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('render sad path', () => {
  beforeEach(() => {
    server.use(http.get(productsUrl, () => HttpResponse.error()));
  });

  it('should render error message if loading fails', async () => {
    render(<ProductList />);

    await screen.findByRole('alert', { name: /error/i });
  });
});
