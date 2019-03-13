
import NewContact from '../src/client/views/Components/NewContact/NewContact';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

test('ContactDetail component renders all details', () => {

    const rendered = renderer.create(
        <Router>
            <NewContact />
        </Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});