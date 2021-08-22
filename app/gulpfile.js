const   gulp =  require("gulp"),
        sass =  require("gulp-sass"),
        prefix =  require("gulp-autoprefixer"),
        uglify =  require("gulp-uglify"),
        sourcemaps =  require("gulp-sourcemaps");
     



gulp.task("html",function(){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
});
//--- 

gulp.task("sass",function(){
    return gulp.src("src/css/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix("last 2 versions"))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/css"))
});
//---


gulp.task("js",function(){
    return gulp.src("src/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("dist/js"))
});
//---s

gulp.task("watch",function(){
    require("./server.js")
    gulp.watch("src/*.html",gulp.series("html"))
    gulp.watch("src/css/*.scss",gulp.series("sass"))
    gulp.watch("src/js/*.js",gulp.series("js"))
});


