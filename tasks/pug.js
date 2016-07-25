'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	pug = require('gulp-pug'),
	assign = require('object-assign');

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
		minify: false
	}, options);

	var pugOutputStyle;

	if (options.minify == false) {
		pugOutputStyle = true;
	} else {
		pugOutputStyle = false;
	}

	return gulp.src(options.pathToSrc + '/!(_)*.pug')
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(pug({
			pretty: pugOutputStyle
		}))
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpPug = handymanPug;