// npm install gulp browser-sync gulp-sass --save-dev
//or 

// npm install gulp --save-dev
var gulp  = require('gulp');
//npm install browser-sync --save-dev
var browserSync = require('browser-sync').create();
// npm install gulp-sass --save-dev
var sass  = require('gulp-sass');
// npm install gulp-concat
var concat = require('gulp-concat');
// npm install gulp-minify-css
var minifyCSS = require('gulp-minify-css');
// npm install gulp-uglify
var uglify = require('gulp-uglify');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
		.pipe(gulp.dest("src/js"))
		.pipe(browserSync.stream());
});

// Minify css file into dist folder
gulp.task('build-css', function() {
   return gulp.src(['src/css/bootstrap.css','src/css/style.css'])
	.pipe(minifyCSS())
	.pipe(concat('webapp.min.css'))
	.pipe(gulp.dest('src/dist'))
	.pipe(browserSync.stream());
});

// Minify js file into dist folder
gulp.task('build-js', function() {
	gulp.src(['src/js/jquery.min.js','src/js/popper.min.js','src/js/bootstrap.min.js','src/js/website.js'])
	.pipe(uglify())
	.pipe(concat('webapp.min.js'))
	.pipe(gulp.dest('src/dist'))
	.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass','build-css'], function() {

	browserSync.init({
		server: "./src"  
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
	gulp.watch(['src/css/botstrap.css','src/css/style.css'], ['build-css']);
	gulp.watch(['src/js/jquery.min.js','src/js/popper.min.js','src/js/bootstrap.min.js','src/js/website.js'], ['build-js']);
	// gulp.run(['build-css']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);