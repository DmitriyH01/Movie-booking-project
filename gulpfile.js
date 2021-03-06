const scss = require("gulp-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglifyEs = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const { src, dest, watch, parallel, series } = require("gulp");

function browsersync() {
  browserSync.init({ server: { baseDir: "app" }, notify: false });
}

function convertsToCss() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 2 versions"], grid: true })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return src("app/js/modules/*.js")
    .pipe(concat("main.min.js"))
    .pipe(uglifyEs())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

function build() {
  return src(
    [
      "app/css/style.css",
      "app/fonts/**/*",
      "app/js/main.min.js",
      "app/*.html",
      "app/images/*",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/scss/**/*.scss"], convertsToCss);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return del("dist");
}

exports.convertsToCss = convertsToCss;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(convertsToCss, scripts, browsersync, watching);

// use "gulp" for start
// use "gulp build" for compare project into "dist" folder
