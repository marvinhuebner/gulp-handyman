'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	gulpif = require('gulp-if'),
	assign = require('object-assign');

function handymanSass(options) {
	if (typeof options === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof options.pathToSrc === 'undefined') {
		throw new Error('You need to define a source path');
	}

	if (typeof options.pathToDest === 'undefined') {
		throw new Error('You need to define an destination path');
	}

	options = assign({
		pathToSrc: '',
		pathToDest: '',
		minify: false,
		fileName: '',
		sourcemaps: true
	}, options);

	var fileNameRename;

	if (typeof options.fileName === 'undefined') {
		fileNameRename = false;
	} else {
		fileNameRename = true;
	}

	var sassOutputStyle;

	if (options.minify == false) {
		sassOutputStyle = 'expanded';
	} else {
		sassOutputStyle = 'compressed';
	}

	return gulp.src(options.pathToSrc)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulpif(options.sourcemaps, sourcemaps.init()))
		.pipe(sass({outputStyle: sassOutputStyle}))
		.pipe(autoprefixer())
		.pipe(gulpif(fileNameRename, rename(options.fileName + '.css')))
		.pipe(gulpif(options.sourcemaps, sourcemaps.write('./')))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpSass = handymanSass;