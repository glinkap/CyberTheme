'use strict';

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		csso = require('gulp-csso'),
		autoprefixer = require('gulp-autoprefixer'),
		fontmin = require('gulp-fontmin'),
		del = require('del'),
		svg2png = require('gulp-svg2png'),
		svgmin = require('gulp-svgmin'),
		changed = require('gulp-changed'),
		connect = require('gulp-connect');

/*
* Запуск вебсервера
*/
gulp.task('webserver', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('./demo/*.html')
	.pipe(connect.reload());
});

/*
* Генерируем стилевые файлы
*/
gulp.task('style', function() {
	gulp.src('./source/styles/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('./assets/css/'))
	.pipe(connect.reload());
});

/*
* Генерируем веб-шрифты
*/
gulp.task('font', ['font:build'], function () {
	// Нужно прибраться после генератора шрифтов
	del(['./assets/fonts/*.css']);
});

gulp.task('font:build', function () {
	return gulp.src('./source/fonts/*.ttf')
	.pipe(fontmin())
	.pipe(gulp.dest('./assets/fonts/'));
});

/*
* Подготавливаем изображения
*/
gulp.task('image', ['image:rasterize'], function () {
	gulp.src('./source/images/**/*.svg')
	.pipe(changed('./assets/img/'))
	.pipe(svgmin())
	.pipe(gulp.dest('./assets/img/'));
});

gulp.task('image:rasterize', function () {
	return gulp.src('./source/images/**/*.svg')
	.pipe(changed('./assets/img/'))
	.pipe(svg2png())
	.pipe(gulp.dest('./assets/img/'));
});

/*
* Копируем зависимости из bower_components
*/
gulp.task('vendor', ['vendor:css'], function() {
	gulp.src([
		'./bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/prism/prism.js',
		'./bower_components/clipboard/dist/clipboard.min.js',
		'./bower_components/html5shiv/dist/html5shiv.min.js',
		'./bower_components/respond/dest/respond.min.js'
	])
	.pipe(gulp.dest('./vendor/js'));
});

gulp.task('vendor:css', function() {
	return gulp.src([
		'./bower_components/prism/themes/prism.css'
	])
	.pipe(gulp.dest('./vendor/css'));
});

/*
* Запуск слежки за исходниками
*/
gulp.task('watch', function() {
  gulp.watch('./source/styles/**/*.scss', ['style']);
	gulp.watch(['./demo/*.html'], ['html']);
	gulp.watch(['./source/fonts/*.ttf'], ['font']);
});

/*
* Начало работы
*/
gulp.task('default', ['webserver', 'watch']);
