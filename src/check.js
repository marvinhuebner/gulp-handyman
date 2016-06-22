'use strict';

var fs = require('fs'),
	assign = require('object-assign'),
	gutil = require('gulp-util');


function checkModuleVersion(options) {
	if (typeof options === 'undefined') {
		throw new Error('It requires a settings object to compare the modules');
	}

	if (typeof options.module === 'undefined') {
		throw new Error('You need to assign a module as a string');
	}

	options = assign({
		dependencies: false,
		devDependencies: false,
		module: ''
	}, options);

	if (typeof options.module !== 'string') {
		throw new Error('option:module must be a string')
	}

	if (typeof options.dependencies !== 'boolean') {
		throw new Error('option:dependencies must be a boolean');
	}

	if (typeof options.devDependencies !== 'boolean') {
		throw new Error('option:devDependencies must be a boolean');
	}

	if (options.dependencies == true && options.devDependencies == true) {
		throw new Error('You can only set dependencies or devDependencies, not both at the same time');
	}

	var projectPackageJson = JSON.parse(fs.readFileSync('package.json'));
	var modulePackageJson = JSON.parse(fs.readFileSync('node_modules/' + options.module + '/package.json'));

	var projectVersion;

	if (options.dependencies == true) {
		projectVersion = projectPackageJson.dependencies[options.module];
	}

	if (options.devDependencies == true) {
		projectVersion = projectPackageJson.devDependencies[options.module];
	}

	var projectVersionOnly = projectVersion.replace(/[\^]|[\~]|[\#]/, "");

	var moduleVerson = modulePackageJson.version;

	if (projectVersionOnly != moduleVerson) {
		throw new Error(gutil.colors.red('ERROR: ') + gutil.colors.cyan(options.module) + ' version is not equal to ' + gutil.colors.cyan(options.module) + ' in your node_modules folder\n\n');
	}
}


module.exports.equalVersionModule = checkModuleVersion;