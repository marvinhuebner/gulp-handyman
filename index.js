'use strict';

var fs = require('fs'),
    assign = require('object-assign');


function checkModuleVersion(options) {
    if (typeof options === 'undefined') {
        throw new Error('Check requires a settings object.');
    }

    if (typeof options.module === 'undefined') {
        throw new Error('You need to asign a module');
    }

    options = assign({
        dependencies: false,
        devDependencies: false,
        module: null
    }, options);

    if (typeof options.dependencies !== 'boolean') {
        throw new Error('dependencies must be a boolean');
    }

    if (typeof options.devDependencies !== 'boolean') {
        throw new Error('devDependencies must be a boolean');
    }

    if (options.dependencies == true && options.devDependencies == true) {
        throw new Error('You can only set dependencies or devDependencies, not both at the same time');
    }

    var projectPackageJson = JSON.parse(fs.readFileSync('./package.json'));
    var modulePackageJson = JSON.parse(fs.readFileSync('./node_modules/' + options.module + '/package.json'));

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
        throw new Error('You hove not the same versions');
    }
}

module.exports.checkVersion = checkModuleVersion;

checkModuleVersion({
    dependencies: true,
    module: 'gulp-util'
});