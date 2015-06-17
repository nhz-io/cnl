_ = (require './package.json').gulpfile

$ =
  gulp          :require 'gulp'
  test          :require 'gulp-mocha'
  coffee        :require 'gulp-coffee'
  lint          :require 'gulp-coffeelint'
  del           :require 'del'
  replace       :require 'gulp-replace'
  run           :require 'run-sequence'
  uglify        :require 'gulp-uglify'
  browserify    :require 'browserify'
  collapse      :require 'bundle-collapser/plugin'
  source        :require 'vinyl-source-stream'
  buffer        :require 'vinyl-buffer'
  packer        :require 'gulp-packer'
  streamify     :require 'gulp-streamify'
  docco         :require 'gulp-docco'
  map           :require 'map-stream'

  extendsRegexp : /((__)?extends?)\s*=\s*function\(child,\s*parent\)\s*\{.+?return\s*child;\s*\}/

$.gulp.task 'default', (cb) -> $.run [ 'dist' ], cb

$.gulp.task 'clean', (cb) -> $.del [
  _.build
  _.dist
  "./#{_.browserify}.js"
  "./#{_.browserify}.min.js"
  "./#{_.browserify}.pack.min.js" ], cb

$.gulp.task 'lint', ->
  $.gulp
    .src [ "#{_.source}/**/*.+(coffee|litcoffee|coffee.md)" ]
    .pipe $.lint './coffeelint.json'
    .pipe $.lint.reporter()

$.gulp.task 'build', ['coffee', 'copy'], ->

$.gulp.task 'copy', ['clean', 'lint'], ->
  $.gulp
    .src [
      "#{_.source}/**/*"
      "#{_.source}/**/*.*"
      "#{_.source}/**/.*"
      "!#{_.source}/**/*.+(coffee|litcoffee|coffee.md)"
      "!#{_.test}" ]
    .pipe $.gulp.dest _.build

$.gulp.task 'coffee', [ 'clean', 'lint'], ->
  $.gulp
    .src [ "#{_.source}/**/*.+(coffee|litcoffee|coffee.md)" ]
    .pipe $.coffee bare:true
    .pipe $.replace $.extendsRegexp, '$1 = require("extends__")'
    .pipe $.gulp.dest _.build

$.gulp.task 'test', [ 'build' ], ->
  unless _.notest
    $.gulp
      .src [ "#{_.test}/**/*.js" ], read: false
      .pipe $.test reporter: 'dot'

$.gulp.task 'browserify', [ 'build', 'test' ], ->
  $.browserify entries: "#{_.build}/#{_.browserify}.js", debug:'false', insertGlobals:false
    .bundle()
    .pipe $.source "#{_.browserify}.js"
    .pipe $.buffer()
    .pipe $.gulp.dest './'

$.gulp.task 'uglify', [ 'build', 'test' ], ->
  $.browserify entries: "#{_.build}/#{_.browserify}.js", debug:'false', insertGlobals:false
    .plugin $.collapse
    .bundle()
    .pipe $.source "#{_.browserify}.min.js"
    .pipe $.buffer()
    .pipe $.uglify()
    .pipe $.gulp.dest './'

$.gulp.task 'pack', [ 'build', 'test' ], ->
  $.browserify entries: "#{_.build}/#{_.browserify}.js", debug:'false', insertGlobals:false
    .plugin $.collapse
    .bundle()
    .pipe $.source "#{_.browserify}.pack.js"
    .pipe $.buffer()
    .pipe $.streamify $.packer base62:true, shrink:true
    .pipe $.gulp.dest './'

$.gulp.task 'docco', ['clean', 'lint'], ->
  $.gulp
    .src [ "#{_.source}/**/*.litcoffee" ]
    .pipe $.buffer()
    .pipe $.map (file, callback) ->
      links = ''
      data = (file.contents.toString 'utf8').replace /^(\[.+\]:.+)$/gm, (match, link) ->
        links += link.replace /^(\[.+?\]:\s*(?!\/\/)[-._a-z0-9\/]+)litcoffee/gmi, "$1html"
        links += "\n"
        return ''
      if links then file.contents = new Buffer data.replace /(^(#{1,6}|(( {4}.*\n*)* {4})).*?$)/gmi, "$1\n#{links}\n"
      callback null, file
    .pipe $.docco()
    .pipe $.gulp.dest _.doc

$.gulp.task 'dist', [ 'build', 'test', 'browserify', 'uglify', 'pack', 'docco' ], ->
  $.gulp
    .src [ "#{_.build}/**", "!#{_.build}/#{_.browserify}.js", "!#{_.build}/test{,/**}" ]
    .pipe $.gulp.dest _.dist
