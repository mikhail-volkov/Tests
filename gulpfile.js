const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const rename = require('gulp-rename');

const styleFiles = [
   './src/css/color.less',
   './src/css/main.less'
]
const scriptFiles = [
   './src/js/lib.js',
   './src/js/main.js'
]

gulp.task('styles', () => {
   return gulp.src(styleFiles)
      .pipe(less())
      .pipe(concat('style.css'))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
   return gulp.src(scriptFiles)
      .pipe(concat('main.js'))
      .pipe(rename({
         suffix: '.min'
      }))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.stream());
});

gulp.task('del', () => {
   return del(['build/*'])
});

gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   gulp.watch('./src/css/**/*.less', gulp.series('styles'))
   gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
   gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts'), 'watch'));
