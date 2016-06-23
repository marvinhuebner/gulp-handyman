'use strict';

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	iconfont = require('gulp-iconfont'),
	consolidate = require('gulp-consolidate'),
	rename = require('gulp-rename'),
	assign = require('object-assign');

function handymanIconFont(iconFontOptions, done) {

	if (typeof iconFontOptions === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof iconFontOptions.srcPath === 'undefined') {
		throw new Error('You need to define an source path');
	}

	if (typeof iconFontOptions.cssFontPath === 'undefined') {
		throw new Error('You need to define an path for your css file');
	}

	if (typeof iconFontOptions.destPathIconFont === 'undefined') {
		throw new Error('You need to define a dest path for the fonts');
	}

	if (typeof iconFontOptions.destPathIconFontSass === 'undefined') {
		throw new Error('You need to define a dest path for the sass');
	}

	iconFontOptions = assign({
		srcPath: null,
		templatePath: 'node_modules/gulp-handyman/template/iconFont.txt',
		fontName: 'icon',
		cssFontPath: null,
		cssClassName: 'icon',
		sassFileName: '_iconfont.scss',
		destPathIconFont: null,
		destPathIconFontSass: null,
		fontFormats: ['ttf', 'eot', 'woff']
	}, iconFontOptions);


	var runTimestamp = Math.round(Date.now()/1000);

	return gulp.src([iconFontOptions.srcPath + '/*.svg'])
		.pipe(iconfont({
			fontName: iconFontOptions.fontName, // required
			prependUnicode: true,
			fontFormats: iconFontOptions.formats,
			timestamp: runTimestamp
		}))
		.on('glyphs', function(glyphs, options) {
			gulp.src(iconFontOptions.templatePath)
				.pipe(consolidate('lodash', {
					glyphs: glyphs,
					fontName: iconFontOptions.fontName,
					fontPath: iconFontOptions.cssFontPath,
					className: iconFontOptions.cssClassName
				}))
				.pipe(rename(iconFontOptions.sassFileName))
				.pipe(gulp.dest(iconFontOptions.destPathIconFontSass));
		})
		.pipe(gulp.dest(iconFontOptions.destPathIconFont));
}

module.exports.gulpIconFont = handymanIconFont;