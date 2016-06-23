'use strict';

var check = require('./src/check.js');
var handymanSass = require('./tasks/sass.js');
var handymanJs = require('./tasks/javaScript.js');
var handymanPug = require('./tasks/pug.js');
var handymanImgMin = require('./tasks/imgMin.js');
var handymanIconFont = require('./tasks/iconFont.js');

// Function for testing of version in package.json is the same as in the node modules folder
module.exports.checkEqualVersion = check.equalVersionModule;

module.exports.gulpSass = handymanSass.gulpSass;

module.exports.gulpJs = handymanJs.gulpJs;

module.exports.gulpPug = handymanPug.gulpPug;

module.exports.gulpImgMin = handymanImgMin.gulpImgMin;

module.exports.gulpIconFont = handymanIconFont.gulpIconFont;