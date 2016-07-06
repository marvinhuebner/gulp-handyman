'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	pug = require('gulp-pug'),
	assign = require('object-assign');

function handymanPug(options) {
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
		minify: false
	}, options);

	var pugOutputStyle;

	if (options.minify == false) {
		pugOutputStyle = true;
	} else {
		pugOutputStyle = false;
	}

	return gulp.src(options.srcPath + '/!(_)*.pug')
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(pug({
			pretty: pugOutputStyle
		}))
		.pipe(gulp.dest(options.destPath));
}

module.exports.gulpPug = handymanPug;