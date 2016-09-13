import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
import App from '../src/components/App';

const expect = chai.expect;
describe('My App', function () {
    it('App should render into document', function () {
        const app = ReactTestUtils.renderIntoDocument(<App/>);
        expect(app).to.be.a('object');
    });
});
