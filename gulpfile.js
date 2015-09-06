'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint scripts
gulp.task('jshint', function() {
  return gulp.src(['scripts/**/*.js', 'gulpfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Lint JS code style
gulp.task('jscs', function() {
  return gulp.src(['scripts/**/*.js', 'gulpfile.js'])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jscs())
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('stylesheets:dev', function() {
  return gulp.src('stylesheets/bae.scss')
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.concat('bae.css'))
    .pipe(gulp.dest('dev'))
    .pipe($.size({title: 'stylesheets'}));
});

gulp.task('scripts:dev', ['jscs', 'jshint'], function() {
  return gulp.src('scripts/**/*.js')
    .pipe($.concat('bae.js'))
    .pipe(gulp.dest('dev'))
    .pipe($.size({title: 'scripts'}));
});

gulp.task('ionfonts:dev', function() {
  return gulp.src('stylesheets/fonts/*')
    .pipe(gulp.dest('dev/fonts'));
});

gulp.task('stylesheets', function() {
  return gulp.src('stylesheets/bae.scss')
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.concat('bae.css'))
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe($.if('*.css', $.csso()))
    .pipe($.concat('bae.min.css'))
    .pipe(gulp.dest('./dist/stylesheets'))
    .pipe($.size({title: 'dist stylesheets'}));
});

gulp.task('scripts', ['jscs', 'jshint'], function() {
  return gulp.src('scripts/**/*.js')
    .pipe($.concat('bae.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe($.size({title: 'dist scripts'}))
    .pipe($.uglify({
      sourceRoot: '.',
      sourceMapIncludeSources: true
    }))
    .pipe($.concat('bae.min.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe($.size({title: 'scripts'}));
});

gulp.task('serve', ['stylesheets:dev', 'scripts:dev', 'ionfonts:dev'], function() {
  browserSync.init({
    notify: false,
    server: './',
    startPath: 'index.html'
  });

  gulp.watch(['./**/*.html'], reload);
  gulp.watch(['stylesheets/**/*.scss'], ['stylesheets:dev', reload]);
  gulp.watch(['scripts/**/*.js'], ['scripts:dev', reload]);
});

gulp.task('default', ['scripts', 'stylesheets']);
