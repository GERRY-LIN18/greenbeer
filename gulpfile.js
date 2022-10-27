

const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function defaultTask(cb) {
    console.log('hello gulp4');
    cb();
}

exports.do = defaultTask;
const fileinclude = require('gulp-file-include');

exports.html =function includeHTML(){
    return src('src/*.html')
        .pipe(fileinclude({
            prefix :'@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'));
}