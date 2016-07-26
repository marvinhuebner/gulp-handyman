'use strict';

const check = require('./src/check.js');
const handymanSass = require('./tasks/sass.js');
const handymanJs = require('./tasks/javaScript.js');
const handymanPug = require('./tasks/pug.js');
const handymanImgMin = require('./tasks/imgMin.js');
const handymanIconFont = require('./tasks/iconFont.js');
const handymanFavicon = require('./tasks/favicon.js');
const handymanSvgSprite = require('./tasks/svgSprite.js');

module.exports.checkEqualVersion = check.equalVersionModule;

module.exports.gulpSass = handymanSass.gulpSass;

module.exports.gulpJs = handymanJs.gulpJs;

module.exports.gulpPug = handymanPug.gulpPug;

module.exports.gulpImgMin = handymanImgMin.gulpImgMin;

module.exports.gulpIconFont = handymanIconFont.gulpIconFont;

module.exports.gulpFavicon = handymanFavicon.gulpFavicon;

module.exports.gulpSvgSprite = handymanSvgSprite.gulpSvgSprite;
