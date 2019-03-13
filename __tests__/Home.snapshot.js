
import Home from '../src/client/views/Components/Home/Home';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { contactTestData } from "../ContactTestData"

test('ContactDetail component renders all details', () => {
    const cData = contactTestData();
    const rendered = renderer.create(
        <Router>
            <Home contacts={cData} />
        </Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});