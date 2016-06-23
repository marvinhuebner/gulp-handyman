'use strict';

var gulp = require('gulp'),
	favicons = require('gulp-favicons'),
	assign = require('object-assign');

function handymanFavicon(options) {
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
		destPath: ''
	}, options);

	return gulp.src([options.srcPath])
		.pipe(favicons({
			files: {
				src: options.srcPath,
				dest: options.destPath,
				iconsPath: '/Icons/',
				html: '/dev/null'
			},
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: false,
				coast: true,
				favicons: true,
				firefox: true,
				opengraph: true,
				windows: false,
				yandex: false
			},
			settings: {
				logging: false,
				vinylMode: true,
				background: false
			}
		}))
		.pipe(gulp.dest(options.destPath));
}

module.exports.gulpFavicon = handymanFavicon;