import { expect, test } from 'vitest';
import { App } from './App';
import { render, screen } from '@testing-library/react';

test('App component renders the text "App"', () => {
  render(<App />);

  expect(screen.getByText('App')).toBeInTheDocument();
});
