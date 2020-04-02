import React from 'react';
import {generate} from 'til-client-test-utils';
import {cleanup, renderIntoDocument, render} from 'react-testing-library';
import Login from '../login';

afterEach(cleanup);

test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn()
  const { getByLabelText, getByText } = renderIntoDocument(<Login onSubmit={handleSubmit} />);
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const submitButton = getByText('submit');

  username.value = fakeUser.username;
  password.value = fakeUser.password;

  // Act
  submitButton.click();

  // Assert
  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
});

test('snapshot', () => {
  // render the login, this will give you back an object with a `container` property
  // expect the `container` property to match a snapshot
  const { container } = render(<Login />);
  expect(container).toMatchSnapshot();
});
