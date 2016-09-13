import React from 'react';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom-global';
import chai from 'chai';
import App from '../src/components/App';

const expect = chai.expect;
describe('My App', function () {
    let app;
    let ulTag;
    before(function () {
        jsdom();
        app = TestUtils.renderIntoDocument(<App/>);
    });

    it('should render into document', function () {
        expect(app).to.be.a('object');
    });

    it('should include the correct number of elements', function () {
        ulTag = TestUtils.findRenderedDOMComponentWithTag(app, 'ul');
        expect(ulTag.children.length).to.equal(4);
    });
});
