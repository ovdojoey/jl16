var Metalsmith = require('metalsmith');
var autoprefixer = require('metalsmith-autoprefixer');
var sass = require('metalsmith-sass');
var cleanCSS = require('metalsmith-clean-css');
var uglify     = require('metalsmith-uglify');
var watch = require('metalsmith-watch');
var layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
  .destination("public/")
  .use(layouts({
    "engine" : "handlebars",
    "directory" : "src/layouts"
  }))
  .use(sass({
    outputDir: 'css/'
  }))
  .use(autoprefixer())
  .use(cleanCSS())
  .use(uglify())
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
      },
      livereload: true,
    })
  )
  .build(function(err){
     if (err) throw err;
   });
