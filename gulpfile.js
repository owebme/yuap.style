var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var base64 = require('gulp-base64');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var combiner = require('stream-combiner2').obj;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

browserSync.init({
	open: false,
	notify: false,
	watchOptions: {
        usePolling: true
    },
	server: {
		baseDir: "./"
	}
});

gulp.task('css', function() {
	return combiner(
		gulp.src('assets/css/style.scss'),
		sass(),
		csso(),
		autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}),
        base64({
            baseDir: './',
            extensions: ['svg', 'png', 'jpg'],
            maxImageSize: 16*1024, // bytes
            debug: false
        }),
		gulp.dest('assets/css'),
		browserSync.stream()
	).on('error', notify.onError({
		"sound": false,
	}));
});

gulp.task('build', gulp.series('css'));

gulp.watch([
	'assets/css/style.scss',
	'assets/css/**/*.scss'
], gulp.series('css'));

gulp.watch([
	'index.html',
	'assets/templates/*.html',
	'assets/templates/**/*.html'
]).on('change', reload);
