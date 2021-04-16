const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

function bundle() {
  return src('./src/index.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest('./dist/'))
}
exports.default = bundle