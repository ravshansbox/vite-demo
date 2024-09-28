import { render, screen } from '@testing-library/react';
import { App } from './App';

test('App component renders red text /hello world/i', () => {
  render(<App />);

  const heading = screen.getByText(/hello world/i);

  expect(heading).toBeInTheDocument();
  expect(heading).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});
