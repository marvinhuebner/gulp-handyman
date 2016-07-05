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
		destPath: ''
	}, options);

	var config;

	config = {
		shape: {
			dimension: {         // Set maximum dimensions
				maxWidth: 32,
				maxHeight: 32
			},
			spacing: {         // Add padding
				padding: 10
			},
			dest: 'out/intermediate-svg'    // Keep the intermediate files
		},
		mode: {
			css: {
				dest: "./",
				layout: "diagonal",
				sprite: paths.sprite.svg,
				bust: false,
				render: {
					scss: {
						dest: "css/src/_sprite.scss",
						template: "build/tpl/sprite-template.scss"
					}
				}
			}
		},

		variables: {
			mapname: "icons"
		},

		symbol: true
	};


	return gulp.src(options.srcPath + '/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest(options.destPath));

}

module.exports.gulpSvgSprite = handymanSvgSprite;