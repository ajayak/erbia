'use strict';

var pathUtil = require('path');
var Q = require('q');
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var plumber = require('gulp-plumber');
var jetpack = require('fs-jetpack');
var electron = require('electron-connect').server.create();

var bundle = require('./bundle');
var utils = require('../utils');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
    copyAllFromAppDir: [
        'app/node_modules/**',
        'app/helpers/**',
        'app/app.html',
        'app/src/**',
        'app/assets/**',
        'app/*.+(jpg|png|svg)',
        'app/bower_components/material-design-icons/iconfont/**',
        'app/bower_components/Materialize/dist/**',
        'app/bower_components/hammerjs/hammer.min.js',
        'app/bower_components/lodash/dist/lodash.min.js',
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/router/dist/router.es5.js',
        'app/bower_components/angular-animate/angular-animate.min.js',        
        'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'app/bower_components/offline/offline.min.js'
    ],
    copyEssentialFromAppDir: [
        'app/helpers/**',
        'app/app.html',
        'app/src/**',
        'app/assets/**'
    ],
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function () {
    return destDir.dirAsync('.', { empty: true });
});


var copyTask = function (path) {
    return function () {
        return gulp
            .src(path, { base: './app' })
            .pipe(gulp.dest(destDir.path()));
    }
};
gulp.task('copy', ['clean'], copyTask(paths.copyAllFromAppDir));
gulp.task('copy-watch', copyTask(paths.copyEssentialFromAppDir));


var bundleApplication = function () {
    return Q.all([
        bundle(srcDir.path('background.js'), destDir.path('background.js')),
        bundle(srcDir.path('main.js'), destDir.path('main.js')),
    ]);
};

var bundleTask = function () {
    return bundleApplication();
};
gulp.task('bundle', ['clean'], bundleTask);
gulp.task('bundle-watch', bundleTask);


var lessTask = function () {
    return gulp.src('app/stylesheets/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(destDir.path('stylesheets')));
};
gulp.task('less', ['clean'], lessTask);
gulp.task('less-watch', lessTask);

gulp.task('finalize', ['clean'], function () {
    var manifest = srcDir.read('package.json', 'json');

    // Add "dev" or "test" suffix to name, so Electron will write all data
    // like cookies and localStorage in separate places for each environment.
    switch (utils.getEnvName()) {
        case 'development':
            manifest.name += '-dev';
            manifest.productName += ' Dev';
            break;
    }

    // Copy environment variables to package.json file for easy use
    // in the running application. This is not official way of doing
    // things, but also isn't prohibited ;)
    manifest.env = projectDir.read('config/env_' + utils.getEnvName() + '.json', 'json');

    destDir.write('package.json', manifest);
});

function reloadRendererProcess(done) {
    return function () {
        electron.reload();
        done();
    }
}

gulp.task('watch', function () {
    watch(['app/*.js', '!app/node_modules', '!app/bower_components'], batch(function (events, done) {
        gulp.start('bundle-watch', reloadRendererProcess(done));
    }));
    watch(paths.copyEssentialFromAppDir, batch(function (events, done) {
        gulp.start('copy-watch', reloadRendererProcess(done));
    }));
    watch(['app/stylesheets/*.less', '!app/node_modules', '!app/bower_components'], batch(function (events, done) {
        gulp.start('less-watch', reloadRendererProcess(done));
    }));
});


gulp.task('build', ['bundle', 'less', 'copy', 'finalize']);
