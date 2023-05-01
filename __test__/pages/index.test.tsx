import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '@/pages';

describe('index page', () => {
  it('should render properly', () => {
    render(<Home />);
    const header = screen.getByRole('heading', { name: 'Hello world' });
    expect(header);
  });

  it('should have a disabled button', () => {
    render(<Home />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
