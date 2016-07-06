'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	svgSprite = require('gulp-svg-sprite'),
	assign = require('object-assign');


function handymanSvgSprite(options) {
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
		destPathSymbolSprite: '',
		destPathScss: ''
	}, options);

	var config;

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


	return gulp.src(options.srcPath + '/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest(options.destPath));

}

module.exports.gulpSvgSprite = handymanSvgSprite;