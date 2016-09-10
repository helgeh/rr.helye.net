module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-ftp-push');

  grunt.initConfig({
    serverpath: '/www/rr.helye.net/',
    ftp_push: {
      deploy: {
        options: {
          authKey: 'authKey1',
          host: 'ftp.domeneshop.no',
          dest: '<%= serverpath %>',
          port: 21,
          incrementalUpdates: true
        },
        files: [
          {
            expand: true,
            cwd: '.',
            src: [
              '**/*',
              '!bower_components/**',
              '!node_modules/**',
              '!.git{,**/}*',
              '!Gruntfile.js',
              '!README.md'
            ]
          }
        ]
      }
    }
  });

  grunt.registerTask('upload', 'Upload files to ftp server.', function(target) {
    // if (target === 'prod') {
    //   grunt.config.set('serverpath', paths.prod);
    // }
    grunt.task.run(['ftp_push:deploy']);
  });

  // grunt.registerTask('release', ['bump', 'upload', 'upload:prod']);
  // grunt.registerTask('stage', ['bump:prerelease', 'upload']);
  grunt.registerTask('default', ['upload']);

};