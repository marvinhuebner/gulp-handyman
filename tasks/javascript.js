'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	gulpif = require('gulp-if'),
	assign = require('object-assign');

function handymanJS(options) {
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
		fileName: '',
		destPath: '',
		minify: false
	}, options);


	return gulp.src(options.srcPath)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat(options.fileName + '.js'))
		.pipe(gulpif(options.minify, uglify()))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(options.destPath));
}

module.exports.handymanJS = handymanJS;