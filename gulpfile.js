const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return gulp
        .src('scss/main.scss')
        .pipe(autoprefixer({ cascade: false }))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('css'))
}

function watchFiles() {
  gulp.watch('scss/abstracts/*.scss', css);
  gulp.watch('scss/base/*.scss', css);
  gulp.watch('scss/components/*.scss', css);
  gulp.watch('scss/layout/*.scss', css);
  gulp.watch('scss/pages/*.scss', css);
  gulp.watch('scss/*.scss', css);
  gulp.watch('index.html', css);
}


// tasks
gulp.task('css', css);
gulp.task('watch', gulp.parallel(watchFiles));