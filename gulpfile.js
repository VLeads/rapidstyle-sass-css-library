const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

function buildStyles() {
  return src("sass/**/*.scss")
    .pipe(
      plumber({
        // Handle errors gracefully without stopping Gulp
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(
      sass({
        // Compile SCSS to CSS
        outputStyle: "compressed", // Minimize the output CSS
      })
    )
    .pipe(
      purgecss({
        // Remove unused CSS based on the content of HTML files
        content: ["*.html"],
      })
    )
    .pipe(dest("css")); // Save the output CSS files in the 'css' directory
}

function watchTask() {
  watch(["sass/**/*.scss", "*.html"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
