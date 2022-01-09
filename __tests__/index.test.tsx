import { screen } from '@testing-library/react';
import { render } from 'utils/testing';
import Home from 'pages/index';

describe('Home', () => {
  it('renders star wars text', () => {
    render(<Home />);
    const heading = screen.getByText(
      'Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with the eponymous 1977 film and quickly became a worldwide pop-culture phenomenons.'
    );
    expect(heading).toBeInTheDocument();
  });
});
