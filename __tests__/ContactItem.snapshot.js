
import ContactItem from '../src/client/views/Components/ContactItem/ContactItem';
import renderer from 'react-test-renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


test('ContactItem component renders all details', () => {

    const rendered = renderer.create(
        <Router>
            <ContactItem item={"0808080"} type={"Number"} index={0} />
        </Router>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});