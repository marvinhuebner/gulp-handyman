'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	assign = require('object-assign');

function handymanSass(options) {
	if (typeof options === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof options.srcPath === 'undefined') {
		throw new Error('You need to define an source path');
	}

	if (typeof options.destPath === 'undefined') {
		throw new Error('You need to define an destination path');
	}

	options = assign({
		srcPath: '',
		destPath: '',
		pretty: true
	}, options);

	var sassOutputStyle;

	if (options.pretty == true) {
		sassOutputStyle = 'expanded';
	} else {
		sassOutputStyle = 'compressed';
	}

	return gulp.src(options.srcPath)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: sassOutputStyle}))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(options.destPath));
}

module.exports.handymanSass = handymanSass;