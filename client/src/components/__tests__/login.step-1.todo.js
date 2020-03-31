import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../login';

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // create a fake object to hold the form field values (username and password)
  // create a jest.fn() for your submit handler
  // render the Login component to a div
  // TIP: const div = document.createElement('div')
  //
  // get the field nodes
  // TIP: const inputs = div.querySelectorAll('input')
  // TIP: const form = div.querySelector('form')
  // fill in the field values
  //
  // Act
  // submit the form:
  // TIP: formNode.dispatchEvent(new window.Event('submit'))
  //
  // Assert
  // ensure your submit handler was called properly
  const container = document.createElement('div');
  const handleSubmit = jest.fn();
  ReactDOM.render(<Login onSubmit={handleSubmit} />, container);
  const form = container.querySelector('form');
  const { username, password } = form.elements;
  username.value = 'foo';
  password.value = 'test';

  form.dispatchEvent(new window.Event('submit'));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    username: username.value,
    password: password.value
  });


});
