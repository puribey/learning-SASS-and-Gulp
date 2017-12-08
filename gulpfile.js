const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/* 

-- TOP LEVEL FUNCTIONS --

gulp.task - define tasks
gulp.src - point to files to use 
gulp.dest - points to folder to output (public)
gulp.watch - watch files and folders for changes 

*/

// logs message // type gulp message in terminal to run 

gulp.task('message', function(){
	return console.log('gulp is running');
}); 


// copy html files to a new automatically created folder call dist
// type gulp htmlfiles in terminal to run 

gulp.task('htmlfiles', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});

// using image min // type gulp imageMin in terminal to run 

gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images')) // it creates images automatically
);

// minify js with uglify // type gulp minify in terminal to run 

/*
gulp.task('minify', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});
*/

// compile all .js files i have into a main.js

gulp.task('scripts', function(){
	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify()) //saque esto de la de arriba para que minifique main.js
		.pipe(gulp.dest('dist/js'))
});

// compile sass // type gulp sass in terminal to run 

gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error',sass.logError))
		.pipe(gulp.dest('dist/css'));
});


// set to default all these tasks // just type gulp in terminal 

gulp.task('default', ['message','htmlfiles','imageMin','scripts','sass']);

// Para guardar todos los cambios automaticamente se usa watch => excelente 
gulp.task('watch', function(){
	gulp.watch('src/js/*.js',['scripts']);
	gulp.watch('src/images/*',['imageMin']);
	gulp.watch('src/sass/*.scss',['sass']);
	gulp.watch('src/*.html',['htmlfiles']);
});