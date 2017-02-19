module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                // autoprefixed options
                browsers: ['last 5 versions']
            },
            dist: {
                //  targeted files
                files: {
                    'css/style.css': 'css/style.css'
                }
            }
        },

        processhtml: {
            options: {
                // Task-specific options go here.
                // types: ['css']
            },

            dist: {
                files: {
                    // Target-specific file lists and/or options go here.
                    '../dist/index.html': ['index.html']
                },
            }
        },

        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    '../dist/index.html': '../dist/index.html', // 'destination': 'source'
                }
            },
        },

        uncss: {
            dist: {
                files: {
                    '../dist/css/style.css': ['*.html']
                }
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.css', '!*.min.css'],
                    dest: '../dist/css',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: ['*.js', '!*.min.js'],
                    dest: '../dist/js',
                    ext: '.min.js'
                }]
            }
        },


        // imagemin: {                          // Task
        //
        //     dynamic: {                         // target
        //         files: [{
        //             expand: true,                  // Enable dynamic expansion
        //             cwd: 'assets/',                   // Src matches are relative to this path
        //             src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
        //             dest: 'dist/assets'                  // Destination path prefix
        //         }]
        //     }
        // },

        watch: {
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },

        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch'); //for watch ad
    grunt.loadNpmTasks('grunt-contrib-sass'); //for sass compile
    grunt.loadNpmTasks('grunt-autoprefixer'); //for css prefix
    grunt.loadNpmTasks('grunt-contrib-uglify'); //for js minify
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //for css minify
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //for html minify
    //grunt.loadNpmTasks('grunt-contrib-imagemin');//for image minify
    grunt.loadNpmTasks('grunt-uncss'); //for disabling unused css
    grunt.loadNpmTasks('grunt-processhtml'); //for processing html to match removed css file

    grunt.task.registerTask('selise-process', ['sass', 'autoprefixer', 'processhtml']); //register a task to automate all tasks

    grunt.task.registerTask('selise-minify', ['htmlmin', 'cssmin', 'uglify']); //register a task to automate all tasks
};