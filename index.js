'use strict';

var check = require('./src/check.js');
var handymanSass = require('./tasks/sass.js');

// Function for testing of version in package.json is the same as in the node modules folder
module.exports.checkEqualVersion = check.equalVersionModule;
module.exports.handymanSass = handymanSass.handymanSass;