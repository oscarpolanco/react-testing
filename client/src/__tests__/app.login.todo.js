// add a beforeEach for cleaning up state and intitializing the API
import React from 'react'
import {Simulate} from 'react-dom/test-utils'
import axiosMock from 'axios'
import {renderWithRouter, generate} from 'til-client-test-utils'
import {init as initAPI} from '../utils/api'
import App from '../app'

beforeEach(() => {
  window.localStorage.removeItem('token')
  axiosMock.__mock.reset()
  initAPI()
})

test('login as an existing user', async () => {
  // render the app with the router provider and custom history
  const {
    container,
    getByText,
    getByLabelText,
    getByTestId,
    finishLoading,
  } = renderWithRouter(<App />);
  //
  // wait for the app to finish loading the mocked requests
  await finishLoading();
  // navigate to login by clicking login-link
  // Simulate.click(getByText('Login'));
  const leftClick = {button: 0}
  Simulate.click(getByText('Login'), leftClick)
  // fill out the form
  const fakeUser = generate.loginForm();
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const form = container.querySelector('form');
  username.value = fakeUser.username;
  password.value = fakeUser.password;
  // submit form
  // first use the axiosMock.__mock.instance
  // to mock out the post implementation
  // it should return the fake user + a token
  // which you can generate with generate.token(fakeUser)
  // Now simulate a submit event on the form
  const { post } = axiosMock.__mock.instance
  const token = generate.token(fakeUser)
  post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {user: {...fakeUser, token}},
    })
  );

  Simulate.submit(form);
  // wait for the mocked requests to finish
  await finishLoading();
  // assert post was called correctly
  // assert localStorage is correct
  // assert the user was redirected (window.location.href)
  // assert the username display is the fake user's username
  // assert the logout button exists
  expect(axiosMock.__mock.instance.post).toHaveBeenCalledTimes(1);
  expect(window.localStorage.token).toEqual(token);
  expect(window.location.href).toEqual('https://til.test.com/');
  expect(getByTestId('username-display').textContent).toEqual(fakeUser.username);
  expect(getByText('logout')).toBeTruthy();
});
