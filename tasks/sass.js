'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const assign = require('object-assign');
const gutil = require('gulp-util');

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
		sourcemaps: true,
		plumberEnv: false
	}, options);

	let fileNameRename;

	if (typeof options.fileName === 'undefined') {
		fileNameRename = false;
	} else {
		fileNameRename = true;
	}

	let sassOutputStyle;

	if (options.minify == false) {
		sassOutputStyle = 'expanded';
	} else {
		sassOutputStyle = 'compressed';
	}

	var plumberConf = {};

	if (options.plumberEnv) {
		plumberConf.errorHandler = function(err) {
			throw err;
		};
	} else {
		plumberConf.errorHandler = function(err) {
			gutil.log(err);
			this.emit('end');
		};
	}


	return gulp.src(options.pathToSrc)
		.pipe(plumber(plumberConf))
		.pipe(gulpif(options.sourcemaps, sourcemaps.init()))
		.pipe(sass({outputStyle: sassOutputStyle}))
		.pipe(autoprefixer())
		.pipe(gulpif(fileNameRename, rename(options.fileName + '.css')))
		.pipe(gulpif(options.sourcemaps, sourcemaps.write('./')))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpSass = handymanSass;