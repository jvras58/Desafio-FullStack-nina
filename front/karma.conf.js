module.exports = function (config) {
config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
    require('karma-jasmine'),
    require('karma-chrome-launcher'),
    require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
    clearContext: false // Deixa os resultados dos testes no navegador
    },
    coverageIstanbulReporter: {
    dir: require('path').join(__dirname, './coverage/my-app'),
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
});
};