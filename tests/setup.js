/* eslint-disable */
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});

global.URL_BASE = 'http://localhost:5000/tests/visual';
