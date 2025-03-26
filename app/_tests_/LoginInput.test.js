import { cleanUp, fireEvent, getByPlaceholderText, getByRole, render, screen } from '@testing-library/react';
import Login from '../login/page';

afterEach(cleanUp);

// Tests for checking rendering of login page and its components
describe('Login page', () => {
    it('should render email and password input fields', () => {
        render(<Login />);

        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });

    it('should allow typing into email and password inputs', () => {
        render(<Login />);
        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'admin2@admin.com' } } );
        fireEvent.change(passwordInput, { target: { value: 'admin123' } } );

        expect(emailInput.value).toBe('admin2@admin.com');
        expect(passwordInput.value).toBe('admin123');
    });

    it('should render a submit button', () => {
        render(<Login />);
        const submitButton = screen.getByRole('button', { name: 'Sign in' });

        expect(submitButton).toBeInTheDocument();
    });

    it('should display error message when `error` is passed as a prop', () => {
        const errorMessage = 'Invalid email or password';
        render(<Login error={errorMessage} />);

        const errorDiv = screen.getByText(errorMessage);
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass('bg-red-50 text-red-700 p-3 rounded');
    });

    it('should disable submit button when `loading` is true', () => {
        render(<Login loading={true} />);
        const submitButton = screen.getByRole('button', { name: 'Sign in' });
        expect(submitButton).toBeDisabled();
    });

    it('should call `handleSubmit` function on form submission', () => {
        const mockHandleSubmit = jest.fn();
        render(<Login handleSubmit={mockHandleSubmit} />);

        const emailInput = screen.getByPlaceholderText('Email address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /Sign in/i });

        fireEvent.change(emailInput, { target: {value: 'test@testemail.com'}});
        fireEvent.change(passwordInput, { target: {value: 'password'}});
        fireEvent.click(submitButton);

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
});

// // Checks that username and password inputs, as well as submit button render
// it('checks username and password inputs render', () => {
//     const { getByPlaceholderText } = render(<Login />);
//     const emailInput = getByPlaceholderText('Email address');
//     const passwordInput = getByPlaceholderText('Password');
    
//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
// });

// // Checks that submit button renders
// it('checks submit button renders', () => { 
//     const {getByRole} = render(<Login />);
//     const submitButton = getByRole('submit');
//     expect(submitButton).toBeInTheDocument();
// });

// // Checks that username and password inputs accept text and submit button is functional
// it('checks username and password inputs accept text and submit button is functional', () => {
    
//     // Render the login page
//     render(<Login />);
//     const emailInput = getByPlaceholderText('Email address');
//     const passwordInput = getByPlaceholderText('Password');
//     const submitButton = getByRole('button', { name: 'Sign in' });
    
//     fireEvent.change(emailInput, { target: { value: 'admin2@admin.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'admin123' } });
//     fireEvent.click(submitButton);

//     expect(emailInput.value).toBe('admin2@admin.com');
//     expect(passwordInput.value).toBe('admin123');
    
//     // Assert redirection to admin dashboard page
//     expect(window.location.pathname).toBe('/admin');
// });


