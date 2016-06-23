'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	svgSprite = require('gulp-svg-sprite'),
	assign = require('object-assign');

function handymanSvgSprite(options) {
	if (typeof options === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof options.srcPath === 'undefined') {
		throw new Error('You need to define a source path');
	}

	if (typeof options.destPath === 'undefined') {
		throw new Error('You need to define an destination path');
	}

	options = assign({
		srcPath: '',
		destPath: ''
	}, options);

	return gulp.src(options.srcPath)
		.pipe(plumber())
		.pipe(svgSprite())
		.pipe(gulp.dest(options.destPath));

}

module.exports.gulpSvgSprite = handymanSvgSprite;