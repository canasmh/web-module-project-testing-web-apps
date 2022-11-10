import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const headerElement = screen.getByText(/contact form/i);
    expect(headerElement).toBeTruthy();
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeVisible();

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fName = screen.getByPlaceholderText(/Edd/);
    await waitFor(() => userEvent.type(fName, "Mann"));
    await waitFor(() => screen.getByText(/error/i));
    expect(screen.getAllByText(/error/i)).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button");
    expect(submitBtn).toBeInTheDocument;

    await waitFor(() => userEvent.click(submitBtn));
    await waitFor(() => screen.getAllByText(/error/i));

    expect(screen.getAllByText(/error/i)).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const fName = screen.getByPlaceholderText(/Edd/);
    const lName = screen.getByPlaceholderText(/Burke/);
    const submitBtn = screen.getByRole("button");

    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    userEvent.type(fName, "Manuel");
    userEvent.type(lName, "Canas");
    await waitFor(() => userEvent.click(submitBtn));
    await waitFor(() => screen.getAllByText(/error/i));

    expect(screen.getAllByText(/error/i)).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/)
    const submitBtn = screen.getByRole("button");

    expect(email).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    userEvent.type(email, "manny");
    await waitFor(() => userEvent.click(submitBtn));
    await waitFor(() => screen.getAllByText(/email must be a valid email address/i));

    expect(screen.getByText(/email must be a valid email address/i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
