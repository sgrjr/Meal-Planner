var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel        = require('gulp-babel');
var browserSync  = require('browser-sync');
var concat       = require('gulp-concat');
var eslint       = require('gulp-eslint');
var filter       = require('gulp-filter');
var newer        = require('gulp-newer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

var onError = function(err) {
  notify.onError({
    title:    "Error",
    message:  "<%= error %>",
  })(err);
  this.emit('end');
};

var plumberOptions = {
  errorHandler: onError,
};

var jsFiles = {
  vendor: [
    'resources/assets/js/vendor/jquery.min.js',
	'resources/assets/js/vendor/react.js',
	'resources/assets/js/vendor/react-dom.min.js',
	'resources/assets/js/vendor/browser.min.js',
	'resources/assets/js/vendor/marked.min.js'
  ],
  source: [
    'resources/assets/js/Utility.js',
    'resources/assets/js/components/App.jsx',
	'resources/assets/js/components/Printable.js'
  ]
};

// Lint JS/JSX files
gulp.task('eslint', function() {
  return gulp.src(jsFiles.source)
    .pipe(eslint({
      baseConfig: {
        "ecmaFeatures": {
           "jsx": true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy NPM’s copy of react.js to assets/js/src/vendor
// only if Bower’s copy is "newer"
gulp.task('copy-react', function() {
  return gulp.src('/node_modules/react/react.js')
    .pipe(newer('resources/assets/js/vendor/react.js'))
    .pipe(gulp.dest('resources/assets/js/vendor'));
});

// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function() {
  return gulp
    .src([
      'resources/assets/js/vendor/react.js'
    ])
    .pipe(gulp.dest('resources/assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-react', 'eslint'], function() {
  return gulp.src(jsFiles.vendor.concat(jsFiles.source))
    .pipe(sourcemaps.init())
    .pipe(babel({
      only: [
        'resources/assets/js/components',
      ],
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
});

// Compile Sass to CSS
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  var filterOptions = '**/*.css';

  var reloadOptions = {
    stream: true,
  };

  var sassOptions = {
    includePaths: [

    ]
  };

  return gulp.src('assets/sass/**/*.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('assets/css'))
    .pipe(filter(filterOptions))
    .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function() {
  gulp.watch('resources/assets/js/**/*.{js,jsx}', ['concat']);
  gulp.watch('resources/assets/sass/**/*.scss', ['sass']);
});

// BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:55"
    });
});

gulp.task('build', ['sass', 'copy-js-vendor', 'concat']);
gulp.task('default', ['build', 'browser-sync', 'watch']);