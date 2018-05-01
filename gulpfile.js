'use strict';

var gulp          = require('gulp'),
    fs            = require('fs'),
    ejs           = require('gulp-ejs'),
    postcss       = require('gulp-postcss'),
    precss        = require('precss'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    sourcemaps    = require('gulp-sourcemaps'),
    plumber       = require('gulp-plumber'),
    rename        = require('gulp-rename'),
    clean         = require('gulp-clean'),
    htmlbeautify  = require('gulp-html-beautify'),
    pngquant      = require('imagemin-pngquant'),
    webpack       = require('webpack-stream'),
    webpackConfig = require('./webpack.config.js'),
    runSequence   = require('run-sequence'),
    browserSync   = require('browser-sync').create(),
    removeEmptyRules = require('postcss-discard-empty'),
    postcssShort  = require("postcss-short"),
    inlineComment = require('postcss-strip-inline-comments'),
    scss          = require("postcss-scss"),
    csso          = require('gulp-csso'),
    chokidar      = require('gulp-chokidar')(gulp);

ejs.delimiter = "?";

/**
 * develop task
 */

gulp.task('ejs', function() {
    var json = JSON.parse(fs.readFileSync('./src/ejs/config.json'));
    var options = {
        indentSize: 2
    };
    return gulp.src(['./src/ejs/views/**/*.ejs'])
        .pipe(plumber())
        .pipe(ejs(json, {}, {ext: '.html'}))
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest('./src/www'))
        .pipe(browserSync.stream());
});

var postcss_processors = [precss, inlineComment, postcssShort, removeEmptyRules];

gulp.task('postcss', function() {
    return gulp.src('./src/pcss/app.p.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(postcss_processors,{syntax: scss}))
        .pipe(autoprefixer())
        .pipe(rename('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/www/css/'))
        .pipe(browserSync.stream());
});

webpackConfig.devtool = "cheap-module-eval-source-map";
gulp.task('webpack', function() {
    return gulp.src(['./src/js/main.js'])
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./src/www/js'))
        .pipe(browserSync.stream());
});

gulp.task('webpack-production', function() {
    webpackConfig.devtool = "";

    return gulp.src(['./src/js/main.js'])
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./src/www/js'))
        .pipe(browserSync.stream());
});

gulp.task('lottie', function() {
    return gulp.src(['./src/js/lottie'])
        .pipe(plumber())
        .pipe(gulp.dest('./src/www/js'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('./src/i/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('./src/www/i'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('./src/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('./src/www/fonts'));
});

gulp.task('favicons', function() {
    return gulp.src(['./src/favicons/**/*'])
        .pipe(plumber())
        .pipe(gulp.dest('./src/www/'));
});

gulp.task('watch', function() {
    chokidar('./src/ejs/**/*.ejs', 'ejs');
    chokidar('./src/pcss/**/*.css', 'postcss');
    chokidar('./src/js/**/*.js', 'webpack');
    chokidar('./src/js//lottie/*', 'lottie');
    chokidar(['./src/i/**/*.jpg', './src/i/**/*.png', './src/i/**/*.svg'], 'images');
});

gulp.task('connect', function() {
    browserSync.init({
        server: './src/www',
        notify: false,
        startPath: "/main.html"
    });
});

gulp.task('default', ['lottie', 'favicons', 'images','fonts','ejs','postcss','webpack','connect', 'watch']);


gulp.task('clean', function () {
    return gulp.src(['./build/css/*.map', './build/js/*.map'])
        .pipe(clean({force: true}))
});

/**
 * build task
 */

gulp.task('minify', function() {
    return runSequence(
        'lottie',
        'webpack-production',
        'favicons',
        'images',
        'fonts',
        'ejs',
        'postcss',
        'copy',
        'clean',
        'minifyCss',
        'minifyJs',
        'minifyImg'
    );
});

gulp.task('copy', function() {
    return gulp.src(['./src/www/**'], {base: './src/www'})
        .pipe(gulp.dest('./build'));
});

gulp.task('minifyCss', function() {
    return gulp.src('./build/css/**/*.css')
        .pipe(plumber())
        .pipe(csso())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('minifyJs', function() {
    return gulp.src(['./build/js/**/*.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyImg', function() {
    return gulp.src(['./build/i/**/*.png', './build/i/**/*.jpg', './build/i/**/*.svg'])
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./build/i'));
});

gulp.task('build', ['minify']);