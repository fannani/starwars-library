import { render, screen } from '@testing-library/react';
import Home from 'pages/index';

jest.mock('utils/settings', () => ({
  useSettings: jest.fn(),
}));

describe('Home', () => {
  it('renders star wars text', () => {
    render(<Home />);
    const heading = screen.getByText('Star Wars');
    expect(heading).toBeInTheDocument();
  });
});
