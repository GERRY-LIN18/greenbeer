

const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');


const fileinclude = require('gulp-file-include');

exports.html =function includeHTML(){
    return src('src/*.html')
        .pipe(fileinclude({
            prefix :'@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}

