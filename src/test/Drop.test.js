import React from 'react';
import ReactDOM from 'react-dom'
import Drop from '../drop';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { createStore } from 'redux';
import allReducers from '../Reducers';
import { Provider } from 'react-redux';
const store = createStore(allReducers);

it("Drop renders without crashing",() => {
    const div = document.createElement('div');
    ReactDOM.render( <Provider store={store}><Drop></Drop></Provider>,div);
})

it("Drop Component renders successfully",() => {
    render(<Provider store={store}><Drop></Drop></Provider>)
})

it("Drop Component renders TO BE DRAGGED ELEMENTS  successfully",() => {
    const {getByTestId} = render(<Provider store={store}><Drop></Drop></Provider>);
    expect(getByTestId('constantelements')).toBeCalled;
})

