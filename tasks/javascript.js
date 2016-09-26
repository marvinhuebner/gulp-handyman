'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const gulpif = require('gulp-if');
const assign = require('object-assign');
const es2015Preset = require('babel-preset-es2015');
const gutil = require('gulp-util');

function handymanJS(options) {
	if (typeof options === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof options.pathToSrc === 'undefined') {
		throw new Error('You need to define an source path');
	}

	if (typeof options.pathToDest === 'undefined') {
		throw new Error('You need to define an destination path');
	}

	options = assign({
		pathToSrc: '',
		fileName: '',
		pathToDest: '',
		minify: false,
		babel: false,
		sourcemaps: true,
		plumberEnv: false
	}, options);

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
		.pipe(gulpif(options.babel, babel({"presets": [es2015Preset]})))
		.pipe(concat(options.fileName + '.js'))
		.pipe(gulpif(options.minify, uglify()))
		.pipe(gulpif(options.sourcemaps, sourcemaps.write('./')))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpJs = handymanJS;