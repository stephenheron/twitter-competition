livereloadPort = 35729
serverPort = 8080

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    wiredep:
      target:
        src: [
          'app/*.html'
        ]
        ignorePath: '..'
        dependencies: true

    coffee:
      compile:
        files: ['app/js/app.js': 'app/coffee/*.coffee']

    connect:
      server:
        options:
          port: serverPort
          base: 'app/'
          livereload: livereloadPort

    watch:
      html:
        files: ['app/*.html']
        tasks: []
      css:
        files: ['app/css/*.css']
        tasks: []
      scripts:
        files: ['app/coffee/*.coffee']
        tasks: ['coffee']
      options:
        livereload: livereloadPort

    open:
      index:
        path: 'http://localhost:' + serverPort

  grunt.loadNpmTasks 'grunt-wiredep'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-open'

  grunt.registerTask 'build', ['wiredep', 'coffee']
  grunt.registerTask 'serve', ['wiredep', 'coffee', 'connect', 'open', 'watch']
