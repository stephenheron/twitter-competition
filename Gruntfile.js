module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {
      target: {
        src: [
          'app/*.html'
        ],
        ignorePath: '..',
        dependencies: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
};
