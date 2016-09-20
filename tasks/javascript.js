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
		sourcemaps: true
	}, options);


	return gulp.src(options.pathToSrc)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulpif(options.sourcemaps, sourcemaps.init()))
		.pipe(gulpif(options.babel, babel({"presets": [es2015Preset]})))
		.pipe(concat(options.fileName + '.js'))
		.pipe(gulpif(options.minify, uglify()))
		.pipe(gulpif(options.sourcemaps, sourcemaps.write('./')))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpJs = handymanJS;