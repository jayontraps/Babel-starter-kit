
'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


gulp.task('build', function () {
    browserify({
        entries: './client/app/main.js',
        debug: true
    })
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});



gulp.task('copy', function () {
    gulp.src('client/index.html')
    .pipe(gulp.dest('./dist'));
});



gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('client/app/**/*.js', ['build']);
    gulp.watch("client/*.html", ['copy']).on('change', browserSync.reload);
});

gulp.task('default', ['copy', 'serve']);