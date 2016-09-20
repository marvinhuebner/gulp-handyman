'use strict';

const gulp = require('gulp');
const favicons = require('gulp-favicons');
const assign = require('object-assign');

function handymanFavicon(options) {
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
		pathToDest: ''
	}, options);

	return gulp.src([options.pathToSrc])
		.pipe(favicons({
			files: {
				src: options.pathToSrc,
				dest: options.pathToDest,
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
		.pipe(gulp.dest(options.pathToDest));
}

module.exports.gulpFavicon = handymanFavicon;