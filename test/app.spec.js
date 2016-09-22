import React from 'react';
import { mount, shallow  } from 'enzyme';
import jsdom from 'jsdom-global';
import { expect } from 'chai';
import App from '../src/components/App';

describe('My App', function () {
    let app;
    let ulTag;
    before(function () {
        jsdom();
        app = mount(<App/>);
    });

    it('should render into document', function () {
        expect(app).to.be.a('object');
    });

    it('should include the correct number of elements', function () {
        expect(mount(<App/>).find('li')).to.have.length(4);
    });
});
