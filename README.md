# React testing course

## Section 1: Introduction

Sometimes we test the UI and got a test that has a behavior but breaks when we change the structure beside the user have still had the same experience than before so when we are testing; we need to identify the most important part that we wanna verify about those components; we want to verify the user experience and how I want to verify this experience instead of verifying the DOM structure for example.

### How to run the first example

- Install all dependicies on the `root` and `configuration/calculator.solution`
- On the root of the project type the following command: `npm run test:react`
- type `p`
- type `section_1_introduction` and you will be on the `jest` watch mode

#### Note:

The example is on `section_1_to_xx/section_1_introduction/__test__/item-list.todo`

## Section 2: Test configuration

### Configuring Jest and Babel

The following steps are for a quick setup of `Jest` on your project:

- On the root of the example (`configuration/calculator`) install the `Jest` dependency using the following command:
`npm install --save-dev jest`
- Go to the `package.json` and add your test script like the following basic example:
```js
"scripts": {
    "test": "jest"
}
```
- Run your script to see what errors you need to fix or if there aren't errors you can continue with the next step
`npm run test`
- Add a `test` on the `__test__`(By default `jest` target all test on this directory) directory. In the case of the exercise, we add the `utils.js` test.
- Run your script: `npm run test` and now `jest` will find the test in our case we will find the test but with an error
- On you `babelrc` file you need to add the following variable to know is you are in `test` mode (`jest` by default put your `NODE_ENV` equal to `test`):
`const isTest = String(process.env.NODE_ENV) === 'test';`
- Ask on the `module` property if we are on `test` mode and if it is you use the default `node` module system `commondjs`.
```js
const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [['@babel/env', {modules: isTest ? 'commonjs' : false}], '@babel/react'],
}
```
- Run your `test` script and you should see your test

#### Note:

We got the `import` error because on an app that uses `Webpack` and `babel`; the `babel` configuration will transpile everything excepts for the `import` because `Webpack` support ESmodules so it can do [tree shaking](https://webpack.js.org/guides/tree-shaking/) that permit to skip some `import` which will remove that code and our bundles will be much smaller. On your `babelrc` on the `preset` property, you need to add the modules as `false` to have this functionality.

### JSDOM

By default `jest` load `JSDOM` on the `test` enviroment so by defult you can use the `windows` object on your test but you can configure this on your `package.json` because use a lot of memory. To configure it you can go to your `packege.json` and add this:
```js
"jest": {
    "testEnviroment": "jest-enviroment-node"
  }
```

The `testEnviroment` target the module in charge of set the enviroment in this case we want to use a `node` enviroment; if you need `JSDOM` you can put `jest-enviroment-jsdom` instead. By default all file that begin with `jest-enviroment-` will be the default partern that will search so you can put your configuration like this:
```js
"jest": {
    "testEnviroment": "node"
  }
```

### Css imports

Sometimes we `import` `css` files on our components and that is an issue with `jest` because it will try to handle the file as a js module; we are using `node` so it will try those `import` as a `JSON` or `js module`. To handel this case you will need to create a config file for `jest` with the name `jest.config.js` and export a propety call `moduleNameMapper`.
```js
module.exports = {
    moduleNameMapper: {
        '\\.css$': require.resolve('./test/style-mock')
    }
}
```

The `moduleNameMapper` will recive a reguler expresion and require the path of a file that will export the object that you need for the mapping; in this case we create the `style-mock` on the `test` directory.

You can use `css modules` for the case that you need to `import` a `css` file. To use `css modules` you just need to add `.module.css` at the en of the file that you need to `import`. This will get back an object that will have keys for every class name (the class name will change like this: `test-class` => `testClass`). With the previous configuration we got an empty object for style so we won't see the class name that we use so we need to add another module that will help us with this call `identity-obj-proxy` (A `proxy` will return what is at the rigth of the dot as it class name).

### Steps to set `css module` using `jest`:

- On the root of the example project install the dependency: `npm install --save-dev identity-obj-proxy`
- Add the following to your `jest.config.js` file
```js
module.exports = {
    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
        '\\.css$': require.resolve('./test/style-mock')
    }
}
```

### Handing dynamic imports

At this moment `node` doesn't support Es modules or dynamic imports and `jest` use `node` so `babel` has a transform that converts this dynamic import into it `node` equivalent that is a `require` statement that turns into a promise to have the same effect. Just need to install `babel-plugin-dynamic-import-node` package as you will see on the following steps.

- Install `babel-plugin-dynamic-import-node` using `npm install --save-dev babel-plugin-dynamic-import-node`
- Go to your `babelrc` file and add the package only if you are on the test environment
```js
const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [['@babel/env', {modules: isTest ? 'commonjs' : false}], '@babel/react'],
  plugins: [
    isTest ? 'dynamic-import-node': null
  ].filter(Boolean),
}
```

### Set code before each test file is executed

In this example, we use `localStore` that doesn't exist in our test environment so we need to add a mock of it. To do this we only need to configure our `jest` config like this:
```js
module.exports = {
    moduleNameMapper: {
        ...
    },
    setupFilesAfterEnv: [require.resolve('./test/setup-test-framework')]
}
```

The path is where we put our object that represents the `localStore`.

### Coverage

With `jest` you just need to add `--coverage` on your `test` script in your `package.json` to have a `coverage` report. You can set some additional options in your `jest` configuration for the report.

- To specify which files, you will be cover on the report you just need to add `collectCoverageFrom`
```js
module.exports = {
    moduleNameMapper: {
        ...
    },
    collectCoverageFrom: ['**/src/**/*.js']
}
```

- To specify a minumun of `%` in each column of the report
```js
module.exports = {
    moduleNameMapper: {
        ...
    },
    coverageThreshold: {
        global: {
            statements: 18,
            branches: 10,
            functions: 19,
            line: 18
        }
    }
}
```

### Jest watch mode

To add the `watch mode` for `jest` you just need to add `--watch` on your script into the `package.json`.

#### Different jest configuration on the same project

You can add different `jest` config files on your project; you just need to set the `projects` property on the config that is on the root of your project.
```js
module.exports = {
    moduleNameMapper: {
        ...
    },
    projects: [
        './client',
        './server'
    ]
}
```

## Section 3: Unit testing React

On this section, we are gonna do some exercise testing the client app of the workshop and will learn some of the tools that we can use for testing the UI but we are concentrating on [unit testing](https://en.wikipedia.org/wiki/Unit_testing)

On the first exercise, we test a `form`. Since we are beginning to use `jest` for the `unit testing` we are not using all function that it has to offer so first we `import` all that we need:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from '../editor.todo';
```

Then we create the `test` function that we need and add the component that we are testing:
```js
test('calls onSubmit with the username and password when submitted', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Editor />, container);
});
```
After that, we extract the new `form` create when we call the component and add some values
```js
test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div');
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container);
  const form = container.querySelector('form');
  const { title, content, tags } = form.elements;
  title.value = 'I like twix';
  content.value = 'Like a lot.. Sorta';
  tags.value = 'twix,   my  ,likes';
});
```
Then we add all `props` that our component needs in order to work correctly; in this case to do a submit
```js
import React from 'react';
import ReactDOM from 'react-dom';
import * as utilsMock from '../../utils/api';
import Editor from '../editor.todo';

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve())
    }
  }
});

test('calls onSubmit with the username and password when submitted', () => {
  const container = document.createElement('div');
  const fakeUser = {
    id: 'foobar'
  }
  const fakeHistory = {
    push: jest.fn()
  };
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container);
  const form = container.querySelector('form');
  const { title, content, tags } = form.elements;
  title.value = 'I like twix';
  content.value = 'Like a lot.. Sorta';
  tags.value = 'twix,   my  ,likes';
});
```

On the previews block, we see `jest.fn()` that make a mock of a function so when we call it we gonna return a function. Then we see a couple of objects(`fakeUser` and `fakeHistory`) that imitate the `props` that the component normally receive but if you can do that and you need to mock a complete module you can use the `jest.mock` a function that will receive the path of a module and replace it with the function that you send as a parameter and you can `import` normally the module because `jest` automatically will change that `import` with the mock that you just send like we did import the `utilsMock`. [Here](https://blog.kentcdodds.com/but-really-what-is-a-javascript-mock-10d060966f7d) a useful article about mocks.

After that we trigger the `submit` event of the `form`
```js
  const submit = new window.Event('submit');
  form.dispatchEvent(submit);
```

Since we are gonna be testing some functions that make a request our test should be `async` and we need to add a waiting time to do the assertions
```js
import React from 'react';
import ReactDOM from 'react-dom';
import * as utilsMock from '../../utils/api';
import Editor from '../editor.todo';

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve())
    }
  }
});

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  });
};

test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div');
  const fakeUser = {
    id: 'foobar'
  }
  const fakeHistory = {
    push: jest.fn()
  };
  ReactDOM.render(<Editor user={fakeUser} history={fakeHistory} />, container);
  const form = container.querySelector('form');
  const { title, content, tags } = form.elements;
  title.value = 'I like twix';
  content.value = 'Like a lot.. Sorta';
  tags.value = 'twix,   my  ,likes';

  const submit = new window.Event('submit');
  form.dispatchEvent(submit);

  await flushPromises();
});
```

Since we gonna test a `promise` we need to wait that is resolve so we use the `flushPromises` function that will wait until the next tick of the event loop before it is resolve.

finally we make the assertions
```js
expect(fakeHistory.push).toHaveBeenCalledTimes(1);
expect(fakeHistory.push).toHaveBeenCalledWith('/');
expect(utilsMock.posts.create).toHaveBeenCalledTimes(1);
expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['twix', 'my', 'likes'],
    date: expect.any(String)
});
```

### react-testing-library

Here we gonna refactor our previews example to use the `react-testing-library`.

First like always you need to `import` what you need
```js
import React from 'react';
import {generate} from 'til-client-test-utils'
import {render, Simulate} from 'react-testing-library'
import Login from '../login';
```

Then you will need to mock some of the `props` that you need
```js
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() that will generate a fake user for you
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn();
});
```

Next you will need to render your component
```js
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() that will generate a fake user for you
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn()

  const { container, getByLabelText, getByText } = render(<Login onSubmit={handleSubmit} />);
});
```

The `render` function will return 3 things:
- The container where you render your component
- The `getByLabelText` function that will return an element depending on the label that you send (The parameter can be sent as a string or regex and isn't case sensitive)
- The `getByText` function that will return an element depending on the text that it renders The parameter can be sent as a string or regex and isn't case sensitive)

Then you need to get all the `nodes` that you need
```js
import React from 'react';
import {generate} from 'til-client-test-utils'
import {render, Simulate} from 'react-testing-library'
import Login from '../login';

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() that will generate a fake user for you
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn();
  const { container, getByLabelText, getByText } = render(<Login onSubmit={handleSubmit} />);
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const submitButton = getByText('submit');
  const form = container.querySelector('form');
});
```
Fill the `inputs` and submit your form
```js
import React from 'react';
import {generate} from 'til-client-test-utils'
import {render, Simulate} from 'react-testing-library'
import Login from '../login';

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() that will generate a fake user for you
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn();
  const { container, getByLabelText, getByText } = render(<Login onSubmit={handleSubmit} />);
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const submitButton = getByText('submit');
  const form = container.querySelector('form');

  username.value = fakeUser.username;
  password.value = fakeUser.password;

  Simulate.submit(form);
});
``` 
[Here](https://reactjs.org/docs/test-utils.html#simulate) a quick look of the `Simulate` function

Then do again the assertions
```js
import React from 'react';
import {generate} from 'til-client-test-utils'
import {render, Simulate} from 'react-testing-library'
import Login from '../login';

// Basic unit test
test('calls onSubmit with the username and password when submitted', () => {
  // Arrange
  // use generate.loginForm() that will generate a fake user for you
  const fakeUser = generate.loginForm();
  const handleSubmit = jest.fn();
  const { container, getByLabelText, getByText } = render(<Login onSubmit={handleSubmit} />);
  const username = getByLabelText('username');
  const password = getByLabelText('password');
  const submitButton = getByText('submit');
  const form = container.querySelector('form');

  username.value = fakeUser.username;
  password.value = fakeUser.password;

  Simulate.submit(form);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser);
  expect(submitButton.type).toBe('submit');
});
```
You can use `renderIntoDocument` that will add the component to the document so you can fire events without the `Simulate` function but it state on the document so you need to use the `cleanup` method after each test.

## Section 4: Snapshot Testing

On this section we will examine `Snapshop testing` that is a mechanism that take some value; serialize it into a string and compare it in the future when our test run.

With `jest` you'll have a function call `toMatchSnapshot` that will assert what you need and it will create a file in a directory called `__snapshots__` a file with the same name of your test file and that `export` a serialize string that represents the things that you want to assert. Also `jest` allows you to configure what it takes when you are doing a `snapshop` and for the example, we use `glamorous` (css on js) and it will live on memory so `jest` is gonna search that style and put it on your `snapshot` and you just need to add `snapshotSerializers` property on your `jest` configuration like this:
`snapshotSerializers: ['jest-glamor-react']`

[Here](https://blog.kentcdodds.com/effective-snapshot-testing-e0d1a2c28eca) an useful article about `snapshot`
