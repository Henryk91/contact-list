
import SearchBar from '../src/client/views/Components/SearchBar/SearchBar';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { contactTestData } from "../ContactTestData"

test('ContactDetail component renders all details', () => {
    const cData = contactTestData();
    const rendered = renderer.create(
        <Router>
            <SearchBar contacts={cData} />
        </Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});