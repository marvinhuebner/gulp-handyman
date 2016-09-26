'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const assign = require('object-assign');
const gutil = require('gulp-util');

function handymanPug(options) {
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
		plumberEnv: false
	}, options);

	let pugOutputStyle;

	if (options.minify == false) {
		pugOutputStyle = true;
	} else {
		pugOutputStyle = false;
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

	return gulp.src(options.pathToSrc + '/!(_)*.pug')
		.pipe(plumber(plumberConf))
		.pipe(pug({
			pretty: pugOutputStyle
		}))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpPug = handymanPug;