import Modal from '@/components/modal/Modal';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Modal component', () => {
  it('should render with title and children', () => {
    const { getByText, getByTestId } = render(
      <Modal
        title="Test Modal"
        close={() => {}}
      >
        <p data-testid="test-child">This is a test child</p>
      </Modal>
    );

    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByTestId('test-child')).toBeInTheDocument();
  });

  it('should call close function when close button is clicked', () => {
    const mockClose = jest.fn();
    const { getByRole } = render(<Modal close={mockClose} />);

    fireEvent.click(getByRole('button'));

    expect(mockClose).toHaveBeenCalled();
  });

  it('should not render when open prop is false', () => {
    const { queryByText } = render(
      <Modal
        open={false}
        close={() => {}}
      />
    );

    expect(queryByText('Test Modal')).not.toBeInTheDocument();
  });
});
