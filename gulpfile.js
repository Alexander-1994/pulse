// С помощью данного файла настроим наш galp. Изначально настроим ИМПОРТЫ ЧЕРЕЗ const:
const gulp        = require('gulp');                                            /* планировщик задач gulp */
const browserSync = require('browser-sync');                                    /* browser-sync - аналог Live Server в VS Code */
const sass        = require('gulp-sass')(require('sass'));                      /* компилятор sass в css */
const cleanCSS = require('gulp-clean-css');                                     /* сжимает css-код */
const autoprefixer = require('gulp-autoprefixer');                              /* подставляем вендерные префиксы css-коды при необходимости */
const rename = require('gulp-rename');                                          /* можно добавлять суффиксы и префиксы с помощью этого файла */
const imagemin = require('gulp-imagemin');                                      /* сжимает изображения при загрузке сайта */
const htmlmin = require('gulp-htmlmin');                                        /* сжимает html-код при загрузке сайта */


gulp.task('server', function() {    
    browserSync({
        server: {
            baseDir: "dist"                                                     /* будет запускаться сервер из dist(чистовой папки), а после сервер "подхватит" index.html */
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);                  /* gulp следит за изменениями html-файлов и при их наличии обновляет страницу в browser-sync */
});

gulp.task('styles', function() {    
    return gulp.src("src/sass/**/*.+(scss|sass)")                               /* мы будем компилировать в css файлы с расширением .sass или .scss */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))     /* формат компилированного кода - сжатый */
        .pipe(rename({suffix: '.min', prefix: ''}))                             /* добавляем суффикс .min к файлу style.css. Результат: style.min.css */
        .pipe(autoprefixer())                                                   /* добавление авторпрефиксов к свойствам css (где это нужно) */
        .pipe(cleanCSS({compatibility: 'ie8'}))                                 /* минимизация css-файла */
        .pipe(gulp.dest("dist/css"))                                            /* получившийся файл поместим в папке css */
        .pipe(browserSync.stream());                                            /* после сохранения sass - будет обновляется страница в browser-sync*/
});

gulp.task('watch', function() {                                                 /* задача, которая следит за обновлениями слилистических файлов */
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));      /* gulp следит за изменениями sass/scss/css -файлов и при их наличии перезапускает задачу styles */
    gulp.watch("src/*.html").on('change', gulp.parallel("html"));               /* gulp следит за изменениями html-файлов и при их наличии запускает задачу html(прописал её ниже) */
})

gulp.task('html', function() {
    return gulp.src("src/*.html")                                               /* получает измененный html-файл */
    .pipe(htmlmin({ collapseWhitespace: true }))                                /* файл обрабатывается при помощи плагина htmlmin */
    .pipe(gulp.dest("dist/"))                                                   /* и сохранится в папке dist */
}) 

gulp.task('scripts', function() {   
    return gulp.src("src/js/**/*.js")                                           /* возьмем все скрипты из src/js и скопируем в dist */
    .pipe(gulp.dest("dist/js"))                                                 /* и сохранится в папке dist/js */
}) 

gulp.task('fonts', function() {   
    return gulp.src("src/fonts/**/*")                                           /* возьмем все шрифты из src/fonts и скопируем в dist */
    .pipe(gulp.dest("dist/fonts"))                                              /* и сохранится в папке dist/fonts */
}) 

gulp.task('icons', function() {   
    return gulp.src("src/icons/**/*")                                           /* возьмем все иконки из src/icons и скопируем в dist */
    .pipe(gulp.dest("dist/icons"))                                              /* и сохранится в папке dist/icons */
}) 

gulp.task('mailer', function() {   
    return gulp.src("src/mailer/**/*")                                          /* возьмем папку mailer из src/mailer и скопируем в dist */
    .pipe(gulp.dest("dist/mailer"))                                             /* и сохранится в папке dist/mailer */
}) 

gulp.task('images', function() {   
    return gulp.src("src/img/**/*")                                             /* возьмем все картинки из src/img и скопируем в dist */
    .pipe(imagemin())                                                           /* картинки оптимизируются(сожмутся) при помощи плагина imagemin */
    .pipe(gulp.dest("dist/img"))                                                /* и сохранится в папке dist/img */
})  


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images'));  /* по умолчанию, параллельно будут запускаться поманды, что в скобках */