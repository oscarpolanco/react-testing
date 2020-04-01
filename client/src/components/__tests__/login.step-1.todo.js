import React from 'react';
import {generate} from 'til-client-test-utils';
import {cleanup, renderIntoDocument} from 'react-testing-library';
import Login from '../login';

// Due to the fact that our element is not in the document, the
// click event on the submit button will not be treated as a
// submit event on the form which is why we're simulating a submit
// event on the form rather than clicking the button and then
// asserting the button's type is set to submit rather than just
// clicking on the button.
//
// Alternatively, we could actually insert the element directly into
// the document, then click on the button and that should work!
// Try doing that!
// (Tip: document.body.appendChild(container) and getByText('submit').click())
//
// Bonus: Don't forget to cleanup after yourselve when you're finished so you don't
// have things hanging out in the document!
//
// Extra bonus, rather than manually inserting the container into the document
// check out the docs for react-testing-library and the renderIntoDocument method!

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
