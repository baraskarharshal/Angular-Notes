/* variables definition */
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// message task
gulp.task('welcome', () => {
    return console.log("Welcome message");
});

// copy css files from src to dist
gulp.task('copy-files', () => {
    return gulp.src('assets/src/css/*.css')
        .pipe(gulp.dest('assets/dist/css'));
});

// compile scss to css files
gulp.task('minify-sass', () => {
    return gulp.src('assets/src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/dist/css'))
        .pipe(browserSync.stream()); // reloads the tab after compiling scss
});

// compile scss to css files
gulp.task('minify-js', () => {
    return gulp.src('assets/src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'))
        .pipe(browserSync.stream()); // reload browser tab after minifying js files
})

// concat multiple js file
gulp.task('concat-js', function () {
    return gulp.src('assets/src/js/*.js')
        .pipe(concat('all-concat.js'))
        .pipe(gulp.dest('assets/dist/js'));
});

// concat & minify multiple js file
gulp.task('concat-minify-js', function () {
    return gulp.src('assets/src/js/*.js')
        .pipe(concat('all-concat-minify.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/dist/js'))
        
});

// gulp watch
gulp.task('watch', function () {    
    gulp.watch('assets/src/js/*.js', gulp.series('concat-minify-js'));
    gulp.watch('assets/src/css/*.scss', gulp.series('minify-sass'));
});

// defult task. It runs using 'gulp' command only. It runs multiple tasks once.
gulp.task('default', gulp.parallel(['welcome', 'watch']));

// browser sync task
gulp.task('browser-sync', function () {    
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('assets/src/js/*.js', gulp.series('concat-minify-js'));
    gulp.watch('assets/src/css/*.scss', gulp.series('minify-sass'));
    gulp.watch('./*.html').on('change', browserSync.reload);
});