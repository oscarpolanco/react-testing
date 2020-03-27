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
