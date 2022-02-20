// С помощью данного файла настроим наш galp.Изначально настроим ИМПОРТЫ ЧЕРЕЗ const:
const gulp        = require('gulp'); /* планировщик задач gulp */
const browserSync = require('browser-sync'); /* browser-sync - аналог Live Server в VS Code */
const sass        = require('gulp-sass')(require('sass')); /* компилятор sass в css */
const cleanCSS = require('gulp-clean-css'); /* сжимает css-код */
const autoprefixer = require('gulp-autoprefixer'); /* подставляем вендерные префиксы css-коды при необходимости */
const rename = require("gulp-rename"); /* можно добавлять суффиксы и префиксы с помощью этого файла */

gulp.task('server', function() {    

    browserSync({
        server: {
            baseDir: "src" /* будет запускаться сервер из src, а после сервер "подхватит" index.html */
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);  /* gulp следит за изменениями html-файлов и при их наличии обновляет страницу в browser-sync */
});

gulp.task('styles', function() {    
    return gulp.src("src/sass/**/*.+(scss|sass)")   /* мы будем компилировать в css файлы с расширением .sass или .scss */
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /* формат компилированного кода - сжатый */
        .pipe(rename({suffix: '.min', prefix: ''})) /* добавляем суффикс .min к файлу style.css. Результат: style.min.css */
        .pipe(autoprefixer())  /* добавление авторпрефиксов к свойствам css (где это нужно) */
        .pipe(cleanCSS({compatibility: 'ie8'})) /* минимизация css-файла */
        .pipe(gulp.dest("src/css"))     /* получившийся файл поместим в папке css */
        .pipe(browserSync.stream());    /* после сохранения sass - будет обновляется страница в browser-sync*/
});

gulp.task('watch', function() {     /* задача, которая следит за обновлениями слилистических файлов */
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));  /* gulp следит за изменениями sass/scss-файлов и при их наличии обновляет страницу в browser-sync */
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));  /* по умолчанию, параллельно будут запускаться поманды, что в скобках */