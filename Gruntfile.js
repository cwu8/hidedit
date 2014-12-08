module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'build/modernizr.js',
                    'js/*.js'
                ],
                dest: 'build/app.js'
            },
            css: {
                src: [
                    'css/*.css'
                ],
                dest: 'build/app.css'
            }
        },
        cssmin: {
            css: {
                src: '<%= concat.css.dest %>',
                dest: 'dist/app.min.css'
            }
        },
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: 'build/modernizr.js',
                extra: {
                    shiv: true,
                    printshiv: false,
                    load: false,
                    mq: false,
                    cssclasses: false
                },
                uglify: false,
                tests: [
                    'a_download',
                    'file_api',
                    'localstorage',
                    'url_data_uri'
                ],
                parseFiles: false
            }
        },
        uglify: {
            options: {
                banner: '/*! HIDEdit | <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            js: {
                files: {
                    'dist/app.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                eqeqeq: false
            }
        },
        watch: {
            files: ['<%= jshint.files %>', '<%= concat.css.src %>'],
            tasks: ['jshint', 'concat', 'cssmin', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-modernizr');

    grunt.registerTask('default', ['jshint', 'modernizr', 'concat', 'cssmin', 'uglify']);
};
