'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const svgSprite = require('gulp-svg-sprite');
const assign = require('object-assign');

function handymanSvgSprite(options) {
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
		pathToDestSymbolSprite: '',
		pathToDestScss: ''
	}, options);

	let config;

	config = {
		shape: {
			dimension: {
				maxWidth: 32,
				maxHeight: 32
			},
			spacing: {
				padding: 5
			}
		},
		mode: {
			css: {
				bust: true,
				prefix: "@mixin sprite-%s",
				render: {
					scss: {
						template: 'node_modules/gulp-handyman/template/svgSprite.handlebars'
					}
				}
			},

			symbol: true
		}
	};


	return gulp.src(options.pathToSrc + '/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest(options.pathToDest));

}

module.exports.gulpSvgSprite = handymanSvgSprite;