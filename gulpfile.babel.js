'use strict';

import gulp          from 'gulp';
import concat        from 'gulp-concat';
import rename        from 'gulp-rename';
import uglify        from 'gulp-uglify';
import sass          from 'gulp-sass';
import sourcemaps    from 'gulp-sourcemaps';
import minifyCss     from 'gulp-clean-css';
import bulkSass      from 'gulp-sass-bulk-import';
import autoprefixer  from 'gulp-autoprefixer';
import gutil         from 'gulp-util';
import gulpif        from 'gulp-if';
import notify        from 'gulp-notify';

/*
Configure environment
1.for dev env run: gulp build
2.for production env run: gulp build --type=prod
*/
const isProd = (gutil.env.type === 'prod') ? true : false;

// SCSS
gulp.task('compile-scss', () => {
  return gulp.src('./grid_only/main.scss')
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(bulkSass())
    .pipe(sass())
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(gulpif(isProd, minifyCss()))
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(gulpif(!isProd, sourcemaps.write('.')))
    .pipe(gulp.dest('./dist'))
    .pipe(notify({ message: 'Styles task complete' }))
});

// gulp build  for production gulp build --type=prod
gulp.task('build', ['compile-scss'], () => {
  console.log('SCSS task complete');
});


