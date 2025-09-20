// Setup file for Mocha tests: create a DOM and expose localStorage
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!doctype html><html><body></body></html>`, {
  url: 'http://localhost'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;

// Provide a simple helper to clear app-specific keys
global.clearAppStorage = function() {
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith('pb_')) localStorage.removeItem(k);
  });
};

// Expose expect globally
const chai = require('chai');
global.expect = chai.expect;
