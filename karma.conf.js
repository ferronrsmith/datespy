// Karma configuration
// Generated on Sat Jan 19 2013 21:49:34 GMT-0400 (AST)


module.exports = function (config) {
    config.set({
        basePath: '',
        files: [
            'adapter/*.src.js',
            'js/libs/**/jquery-*.js',
            'js/libs/**/angular.js',
            'js/libs/**/angular-resource.js',
            'js/app.js',
            'js/services/*.js',
            'js/directives/*.js',
            'js/controllers/*.js',
            'test/vendor/angular-mocks.js',
            'js/libs/matchers/*.js',
            'test/unit/*.js'
        ],
        reporters: ['progress'/*, 'coverage'*/],
//        preprocessors: {
//            '**/js/controllers/*.js': 'coverage',
//            '**/js/directives/*.js': 'coverage',
//            '**/js/services/*.js': 'coverage',
//            '**/app/scripts/app.js': 'coverage'
//        },
//        coverageReporter: {
//            type: 'html',
//            dir: 'coverage/'
//        },
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: LOG_INFO, // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        autoWatch: true,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        singleRun: false,
        frameworks : ['jasmine']


    });
};