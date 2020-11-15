import React from 'react';
import ReactDOM from 'react-dom'
import Drop from '../drop';
import Drag from '../Drag';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { createStore } from 'redux';
import allReducers from '../Reducers';
import { Provider } from 'react-redux';
const store = createStore(allReducers);

it("renders Drag without crashing",() => {
    const div = document.createElement('div');
    ReactDOM.render( <Provider store={store}><Drag></Drag></Provider>,div);
})

it("Drag Component renders successfully",() => {
    render(<Provider store={store}><Drag></Drag></Provider>)
})

it("Component renders TO BE DRAGGED ELEMENTS  successfully",() => {
    const {getByTestId} = render(<Provider store={store}><Drag></Drag></Provider>);
    expect(getByTestId('toBeDraggedelements')).toBeCalled;
})

