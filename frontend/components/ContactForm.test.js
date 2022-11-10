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
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button");
    expect(submitBtn).toBeInTheDocument();

    await waitFor(() => userEvent.click(submitBtn));
    await waitFor(() => screen.getAllByText(/lastName is a required field/i));

    expect(screen.getByText(/lastName is a required field/i)).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const fName = screen.getByPlaceholderText(/Edd/);
    const lName = screen.getByPlaceholderText(/Burke/);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/);
    const submitBtn = screen.getByRole("button");

    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    userEvent.type(fName, "Manuel");
    userEvent.type(lName, "Canas");
    userEvent.type(email, "manuelcanas@hotmail.com")
    await waitFor(() => userEvent.click(submitBtn));
    
    const fNameResult = screen.getAllByText(/Manuel/);
    const lNameResult = screen.getAllByText(/Canas/);
    const emailResult = screen.getAllByText(/manuelcanas@hotmail.com/);
    const messageResult = screen.queryByText(/message:/i);

    expect(fNameResult).toHaveLength(1);
    expect(lNameResult).toHaveLength(1);
    expect(emailResult).toHaveLength(1);
    expect(messageResult).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const fName = screen.getByPlaceholderText(/Edd/);
    const lName = screen.getByPlaceholderText(/Burke/);
    const email = screen.getByPlaceholderText(/bluebill1049@hotmail.com/);
    const message = screen.getByLabelText(/Message/)

    const submitBtn = screen.getByRole("button");

    expect(fName).toBeInTheDocument();
    expect(lName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    userEvent.type(fName, "Manuel");
    userEvent.type(lName, "Canas");
    userEvent.type(email, "manuelcanas@hotmail.com")
    userEvent.type(message, "This is my message.")

    await waitFor(() => userEvent.click(submitBtn));
    const fNameResult = screen.getAllByText(/Manuel/);
    const lNameResult = screen.getAllByText(/Canas/);
    const emailResult = screen.getAllByText(/manuelcanas@hotmail.com/);
    const messageResult = screen.queryByText(/message:/i);

    expect(fNameResult).toHaveLength(1);
    expect(lNameResult).toHaveLength(1);
    expect(emailResult).toHaveLength(1);
    expect(messageResult).toBeInTheDocument();
});
