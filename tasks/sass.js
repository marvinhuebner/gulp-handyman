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

	if (typeof options.srcPath === 'undefined') {
		throw new Error('You need to define a source path');
	}

	if (typeof options.destPath === 'undefined') {
		throw new Error('You need to define an destination path');
	}

	options = assign({
		srcPath: '',
		destPath: '',
		minify: false,
		fileName: ''
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

	return gulp.src(options.srcPath)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: sassOutputStyle}))
		.pipe(autoprefixer())
		.pipe(gulpif(fileNameRename, rename(options.fileName + '.css')))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(options.destPath));
}

module.exports.gulpSass = handymanSass;