'use strict';

const fs = require('fs');
const assign = require('object-assign');
const gutil = require('gulp-util');


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

	let projectPackageJson = JSON.parse(fs.readFileSync('package.json'));
	let modulePackageJson = JSON.parse(fs.readFileSync('node_modules/' + options.module + '/package.json'));

	var projectVersion;

	if (options.dependencies == true) {
		projectVersion = projectPackageJson.dependencies[options.module];
	}

	if (options.devDependencies == true) {
		projectVersion = projectPackageJson.devDependencies[options.module];
	}

	let projectVersionOnly = projectVersion.replace(/[\^]|[\~]|[\#]|[\+]|[\:]|[\/]|[\.]|[\-]|[a-z]/g, "");

	let moduleVerson = modulePackageJson.version;

	let moduleVersionOnly = moduleVerson.replace(/[\^]|[\~]|[\#]|[\+]|[\:]|[\/]|[\.]|[\-]|[a-z]/g, "");

	if (projectVersionOnly != moduleVersionOnly) {
		throw new Error(gutil.colors.red('ERROR: ') + gutil.colors.cyan(options.module) + ' version is not equal to ' + gutil.colors.cyan(options.module) + ' in your node_modules folder\n\n');
	}
}

module.exports.equalVersionModule = checkModuleVersion;