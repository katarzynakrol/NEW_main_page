var gulp = require('gulp');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

// Connects to the server - necessary for the live reload to work further down the line
gulp.task('connect', function () {
    connect.server({
        root: './',
        livereload: true
    });
});

// Reloads all files with the html extension that are loacated in the root directory
gulp.task('reloadHtml', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

// Reloads all files with the css extension that are located inside the dist folder
gulp.task('reloadCss', function () {
    gulp.src('./dist/*.css')
        .pipe(connect.reload());
});

// Reloads all files with the js extension that are located inside the dist folder
gulp.task('reloadJs', function () {
    gulp.src('./dist/*.js')
        .pipe(connect.reload());
});

// Watches for changes in the html, css and js files - in case of any, relaods the appropriate files
gulp.task('watch', function () {
    gulp.watch(['./*.html'], ['reloadHtml']);
    gulp.watch(['./css/*.css'], ['cleanCss', 'minCss', 'reloadCss']);
    gulp.watch(['./js/*.js'], ['cleanJs', 'minJs', 'reloadJs']);
});

// Minifies given css files and then concatenates them in the supplied order
gulp.task('minCss', function () {
    return gulp.src(['./css/style.css', './css/mediaQueries.css'])
        .pipe(cleanCSS())
        .pipe(concat('style.min.css', {
            newLine: ''
        }))
        .pipe(gulp.dest('./dist/'));
});

// Uglifies all files with the js extension that are located inside the js folder and then concatenates them
gulp.task('minJs', function () {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(concat('min.js', {
            newLine: ''
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files and folders from inside of the dist folder
gulp.task('cleanAll', function () {
    return del(['./dist/**', '!./dist']);
});

// Removes all css files and folders from inside of the dist folder
gulp.task('cleanCss', function () {
    return del('./dist/*.css');
});

// Removes all js files and folders from inside of the dist folder
gulp.task('cleanJs', function () {
    return del('./dist/*.js');
});

// Builds the frontend by running clean, minJs and minCss tasks in sequence
gulp.task('build', ['cleanAll', 'minJs', 'minCss']);

// Builds the frontend, connects to the server and watches for changes
gulp.task('default', ['build', 'connect', 'watch']);
