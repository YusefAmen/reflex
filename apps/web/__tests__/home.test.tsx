// Requires: @testing-library/react and a test runner (e.g., jest, vitest) installed as dev dependencies
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('dashboard loads', () => {
  render(<Home />);
  expect(screen.getByText(/Reflex/)).toBeInTheDocument();
}); 