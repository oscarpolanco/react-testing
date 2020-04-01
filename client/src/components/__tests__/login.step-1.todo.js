// using helpful utilities
import React from 'react';
// you'll need these:
import {generate} from 'til-client-test-utils'
import {render, Simulate} from 'react-testing-library'
// note that til-client-test-utils is found in `client/test/til-client-test-utils`
import Login from '../login';

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() here
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn()
  // use: render(<Login onSubmit={handleSubmit} />)
  // It'll give you back an object with
  // `getByLabelText` and `getByText` functions
  // so you don't need a div anymore!
  const { container, getByLabelText, getByText } = render(<Login onSubmit={handleSubmit} />);
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const submitButton = getByText('submit');
  const form = container.querySelector('form');

  username.value = fakeUser.username;
  password.value = fakeUser.password;

  // Act
  // Use Simulate.submit(formNode) instead of these two lines
  Simulate.submit(form);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
  expect(submitButton.type).toBe('submit');
});
