import React from 'react';
import { render } from '@testing-library/react';
import Root from './Components/pages/Root/Root';

test('renders learn react link', () => {
  const { getByText } = render(<Root />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
