
module.exports = function(grunt) {
  grunt.initConfig({
    //pkg : grunt.file.readJSON('package.json'),

    // concat configuratio
    concat: {
      global: {
        src : ['assets/js/app.js','assets/js/form.js','assets/js/windows.js','assets/js/windows_open.js','assets/js/windows_shutter.js','assets/js/lamp.js',
        'assets/js/lamp_table.js', 'assets/js/lamp_plan.js', 'assets/js/lamp_hotte.js', 'assets/js/lamp_wall.js', 'assets/js/env.js', 'assets/js/user.js',
        'assets/js/params.js', 'assets/js/ventilation.js', 'assets/js/heating.js', 'assets/js/hygro.js', 'assets/js/temperature.js', 'assets/js/temperature_int.js',
        'assets/js/temperature_ext.js', 'assets/js/grill.js', 'assets/js/controller.js'],
        dest : 'assets/js/dist/app.js'
      }
    },
    // uglify configuration
    uglify: {
      target : {
        src : ['assets/js/dist/app.js'],
        dest : 'assets/js/dist/app.min.js'
      },
      options: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat:global', 'uglify']);
};