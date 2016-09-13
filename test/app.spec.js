// Include mocha presets for ES6 and react. We must include this otherwise the ES6 transpiles and react won't work in Mocha
require('babel-core/register')({
    presets : ['es2015', 'react', 'stage-0']
});

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom-global';
import App from '../src/components/App';
import chai from 'chai';
const should = chai.should();

describe('My App', function () {
     before(function () {
          jsdom();
     });

     it('App should render into document', function () {
          const app = ReactTestUtils.renderIntoDocument(<App/>);
          app.should.exist;

     })
});
