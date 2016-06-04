'use strict';

var childProcess = require('child_process');
var electron = require('electron-connect').server.create({path: './build'});
var gulp = require('gulp');

gulp.task('start', ['build', 'watch'], function () {
    electron.start();
});
