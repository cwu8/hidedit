module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            js: {
                src: [
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

    grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'uglify']);
};
