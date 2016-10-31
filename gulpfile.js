var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var wiredep = require('wiredep').stream;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var newer = require('gulp-newer');
var ngAnnotate = require('gulp-ng-annotate')
var sftp = require('gulp-sftp');
gulp.task('clean', function () {
    gulp.src('dist/*', {read: false})
        .pipe(clean());
});
gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory:'bower_components'
        }))
        .pipe(useref())
        .pipe(gulpif('./app/scripts/*.js', ngAnnotate()))
        .pipe(gulpif('.*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./dist'));
});
gulp.task('copy-html-files', function () {
    gulp.src('./app/views/**/*.html')
        .pipe(gulp.dest('./dist/views/'))
});
gulp.task('image', function () {
    gulp.src('./app/img/*.*')
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('font', function () {
    gulp.src('./app/font/**/*.*')
        .pipe(gulp.dest('./dist/font/'));
});
gulp.task('build', function(){
    runSequence(
        'bower',
        'copy-html-files',
        'image',
        'font',
        'watch'
    );
});
gulp.task('watch', function() {
    gulp.watch('./app/**/**/*.*', ['bower', 'copy-html-files'])
});
gulp.task('default',['clean', 'build']);