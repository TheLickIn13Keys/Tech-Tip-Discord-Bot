var gulp = require('gulp');
var coffee = require('gulp-coffee');

gulp.task("default", ["coffee"], function(){
	// let other tasks do the work
});

gulp.task("coffee", function(){
	return gulp.src("source/*.coffee")
		.pipe(coffee())
		.pipe(gulp.dest("compiled"));
})

gulp.task("watch", ["default"], function() {
	gulp.watch("source/*coffee", ["coffee"])
})
