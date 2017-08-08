import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Block from '../Block';

describe('Block', () => {

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Block />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(
      <Block />
    );
    let tree = component.toJSON;
    expect(tree).toMatchSnapshot();
  });

});

