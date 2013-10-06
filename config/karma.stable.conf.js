/*global module */
module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            'js/lib/angular/angular-stable-latest.js',
            'js/lib/angular/angular-stable-mocks.js',
            'js/src/datespy.js',
            'test/src/*.js',
            'test/spec/*.js'
        ],
        autoWatch: true,
        browsers: ['Chrome'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
