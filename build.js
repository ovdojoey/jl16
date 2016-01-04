var Metalsmith = require('metalsmith');
var autoprefixer = require('metalsmith-autoprefixer');
var sass = require('metalsmith-sass');
var cleanCSS = require('metalsmith-clean-css');
var uglify     = require('metalsmith-uglify');
var watch = require('metalsmith-watch');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');

Metalsmith(__dirname)
  .destination("public/")
  .use(collections({
    portfolio: {
      sortBy: 'date',
      reverse: true
    },
    blog: {
      sortBy: 'date',
      reverse: true
    },
    latestBlog: {
      pattern: 'blog/*.html',
      sortBy: 'date',
      limit: 3,
      reverse: true
    }
  }))
  .use(filecheck)
  .use(layouts({
    "engine" : "handlebars",
    "directory" : "src/layouts",
    "partials": "src/layouts/partials"
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
        "${source}/**/*": "*",
        "${source}/**/**/*": "*",
      },
      livereload: true,
    })
  )
  .build(function(err){
     if (err) throw err;
     console.log(this._metadata.latestBlog[0]);
   });

   /**
    * Concat plugin.
    *
    * @param {Object} files
    * @param {Metalsmith} metalsmith
    * @param {Function} done
    */

   function filecheck(files, metalsmith, done){
     var css = '';

     for (var file in files) {
      //  console.log(file);

       if ( files[file].collection && files[file].collection.length > 0 ) {
        //  console.log( files[file].collection);
        //  console.log( files[file] );

       }
      //  if ('.css' != extname(file)) continue;
      //  css += files[file].contents.toString();
      //  delete files[file];
     }



    //  files['index.css'] = {
    //    contents: new Buffer(css)
    //  };

     done();
   }
