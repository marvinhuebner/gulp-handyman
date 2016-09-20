'use strict';

const check = require('./src/check.js');
const handymanSass = require('./tasks/sass.js');
const handymanJs = require('./tasks/javascript.js');
const handymanPug = require('./tasks/pug.js');
const handymanImgMin = require('./tasks/imgmin.js');
const handymanIconFont = require('./tasks/iconfont.js');
const handymanFavicon = require('./tasks/favicon.js');
const handymanSvgSprite = require('./tasks/svgsprite.js');

module.exports.checkEqualVersion = check.equalVersionModule;

module.exports.gulpSass = handymanSass.gulpSass;

module.exports.gulpJs = handymanJs.gulpJs;

module.exports.gulpPug = handymanPug.gulpPug;

module.exports.gulpImgMin = handymanImgMin.gulpImgMin;

module.exports.gulpIconFont = handymanIconFont.gulpIconFont;

module.exports.gulpFavicon = handymanFavicon.gulpFavicon;

module.exports.gulpSvgSprite = handymanSvgSprite.gulpSvgSprite;
