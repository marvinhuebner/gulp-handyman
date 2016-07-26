'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const rename = require('gulp-rename');
const assign = require('object-assign');

function handymanIconFont(iconFontOptions, done) {

	if (typeof iconFontOptions === 'undefined') {
		throw new Error('It requires a settings object');
	}

	if (typeof iconFontOptions.pathToSrc === 'undefined') {
		throw new Error('You need to define an source path');
	}

	if (typeof iconFontOptions.cssFontPath === 'undefined') {
		throw new Error('You need to define an path for your css file');
	}

	if (typeof iconFontOptions.pathToDestIconFont === 'undefined') {
		throw new Error('You need to define a dest path for the fonts');
	}

	if (typeof iconFontOptions.pathToDestIconFontSass === 'undefined') {
		throw new Error('You need to define a dest path for the sass');
	}

	iconFontOptions = assign({
		pathToSrc: null,
		templatePath: 'node_modules/gulp-handyman/template/iconFont.txt',
		fontName: 'icon',
		cssFontPath: null,
		cssClassName: 'icon',
		sassFileName: '_iconfont.scss',
		pathToDestIconFont: null,
		pathToDestIconFontSass: null,
		fontFormats: ['ttf', 'eot', 'woff']
	}, iconFontOptions);


	let runTimestamp = Math.round(Date.now()/1000);

	return gulp.src([iconFontOptions.pathToSrc + '/*.svg'])
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
					fontPath: iconFontOptions.cssFontPath + '/',
					className: iconFontOptions.cssClassName
				}))
				.pipe(rename(iconFontOptions.sassFileName))
				.pipe(gulp.dest(iconFontOptions.pathToDestIconFontSass));
		})
		.pipe(gulp.dest(iconFontOptions.pathToDestIconFont));
}

module.exports.gulpIconFont = handymanIconFont;