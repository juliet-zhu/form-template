'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy:{
      dev:{
        cwd:'source',
        src:['**','!**/*.jade','!**/*.styl','!pages/template'],
        dest:'dev',
        expand:true
      },
      pub:{
        cwd:'dev',
        src:['**','!pages/**'],
        dest:'pub',
        expand:true
      },
      pages:{
        options:{
          process:function(content,srcpath){
            return content.replace(/\.\.\//gi,"");
          }
        },
        cwd:'dev/pages',
        src:['**'],
        dest:'pub',
        expand:true
      }
    },
    clean:{
      dev:{
        src:['dev']
      },
      pub:{
        src:['pub']
      }
    },
    stylus:{
      dev:{
        files:{
          'dev/css/main.css':['source/css/main.styl']
        }
      }
    },
    concat:{
      pub:{
        files:{
          'pub/js/components/components.js':[
            'pub/js/components/*.js']
        }       
      } 
    },
    cssmin:{
      pub:{
        expand: true,
        cwd: 'dev/css/',
        src: 'main.css',
        dest: 'pub/css/',
        ext: '.min.css'
      }
    },
    uglify:{
      options:{
        mangle:false
      },
      pub:{
        files:{
        'pub/js/components/components.min.js':['pub/js/components/components.js']
        } 
      }   
    },
    usemin:{
      html:'pub/*.html',
    },
    jade:{
      compile:{
        options:{
          pretty:true
        },
        files:[{
          expand: true,
          cwd:'source',
          src:['**/*.jade','!pages/template/*.jade'],
          dest:'dev',
          ext:'.html'
        }]
      }
    },
    jshint:{
      all:['Gruntfile.js','source/js/*.js']
    },
    watch:{
      options:{
        livereload:true
      },
      stylesheets:{
        files:'source/**/*.styl',
        tasks:'stylus'
      },
      jade:{
        files:'source/**/*.jade',
        tasks:['jade']
      },
      copy:{
        files:['source/**','!source/**/*.styl','!source/**/*.jade'],
        tasks:['copy:dev']
      }
    },
    connect:{
      server:{
        options:{
          port:35728,
          base:'.',
          livereload:true,
          opten:true,
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(require('connect-livereload')());
            return middlewares;
          }
        }
      }
    }
  });

  // Load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-concat');
  

  // Define the tasks
  grunt.registerTask(
    'pub',
    'Minify js and css.',
    ['clean:pub','copy:pub','copy:pages','connect','watch']
  );

  grunt.registerTask(
    'dev', 
    'Compiles all of the assets and copies the files to the dev directory.', 
    [ 'clean:dev','copy:dev', 'stylus', 'jade' ]
  );

  grunt.registerTask(
    'default', 
    'Watches the project for changes, automatically builds them and runs a server.', 
    [ 'dev', 'connect', 'watch' ]
  );
}