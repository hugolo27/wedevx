import { render, screen } from '@testing-library/react';
import LeadForm from '../LeadForm';

describe('LeadForm', () => {
  it('renders the lead form fields', () => {
    render(<LeadForm />);
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    const countrySelect = screen.getByRole('combobox', { name: '' });
    expect(countrySelect).toBeInTheDocument();
    expect(screen.getByText(/Country of Citizenship/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });
}); 