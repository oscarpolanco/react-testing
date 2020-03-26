// Your job:
// Test the case where the items provided is empty:
//   <ItemList items={[]} />
// Test the case where there are items in the list:
//   <ItemList items={['apple', 'orange', 'pear']} />
//
// Don't overthink it. This is just a practice run to warm you up
// to testing react components.

// So you can use JSX (which transpiles down to React.createElement):
// import React from 'react'
//
// So you can render the component for testing:
// import ReactDOM from 'react-dom'
//
// So you can create a react element for the component you're testing:
// import ItemList from '../item-list'

// and here's an outline example of your first test:
//   Create a "container" to render your component into (tip: use document.createElement('div'))
//
//   Render your component (tip: use ReactDOM.render(JSX, container))
//
//   Make your assertion(s) on the textContent of the container
//   (tip: expect's toMatch function might be what you want
//   for example: `expect('some text content').toMatch('text')`)
//
// For your second test, it will be very similar to the first.
import React from 'react';
import ReactDOM from 'react-dom';
import ItemList from '../item-list';

test('renders "no items" when no items are given', () => {
  const container = document.createElement('div');
  ReactDOM.render(<ItemList items={[]} />, container);
  expect(container.textContent).toMatch('no items');
});

test('renders the items given', () => {
  const container = document.createElement('div');
  ReactDOM.render(<ItemList items={['apple', 'orange', 'pear']} />, container);
  expect(container.textContent).toMatch('apple', 'orange', 'pear');
});
