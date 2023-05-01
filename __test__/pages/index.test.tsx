import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '@/pages';

describe('index page', () => {
  it('should render properly', () => {
    render(<Home />);
    const header = screen.getByLabelText(/name/i);
    expect(header);
  });
});
