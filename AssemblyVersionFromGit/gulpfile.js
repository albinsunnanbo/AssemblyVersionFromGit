/// <binding BeforeBuild='assemblyInfo' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    assemblyInfo = require('gulp-dotnet-assembly-info'),
    spawn = require('child_process').spawn,
    fs = require('fs');

var template =
        "using System.Reflection;" + "\r\n" +
        "\r\n" +
        "[assembly: AssemblyVersion(\"1.0.0.0\")]" + "\r\n" +
        "[assembly: AssemblyFileVersion(\"1.0.0.0\")]" + "\r\n" +
        "[assembly: AssemblyInformationalVersion(\"DEV\")]" + "\r\n";


var GIT_HASH = "na";
var GIT_COUNT = "na";

gulp.task('write-template', function (cb) {
    fs.writeFile('./Properties/AssemblyInfo.VersionNumber.cs', template, cb);
});

gulp.task('version', function (cb) {
    var child = spawn("git", ["log", "--pretty=%H", "-1"], { cwd: process.cwd() }),
        stdout = '',
        stderr = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        stdout += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        stderr += data;
    });

    child.on('close', function (code) {
        var normalized = stdout.replace(/(?:\r\n|\r|\n)/g, "")
        console.log("Version: " + normalized);
        GIT_HASH = normalized;
        cb(); // Done
    });
});

gulp.task('gitcount', function (cb) {
    var child = spawn("git", ["rev-list", "--count", "HEAD"], { cwd: process.cwd() }),
        stdout = '',
        stderr = '';

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        stdout += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        stderr += data;
    });

    child.on('close', function (code) {
        var normalized = stdout.replace(/(?:\r\n|\r|\n)/g, "")
        console.log("Git Count: " + normalized);
        GIT_COUNT = normalized;
        cb(); // Done
    });
});

gulp.task('assemblyInfo', ['write-template', 'gitcount', 'version'], function () {
    var versionBase = '1.0.0.';
    gulp.src('**/AssemblyInfo.VersionNumber.cs')
        .pipe(assemblyInfo({
            version: function (value) { return versionBase + GIT_COUNT; },
            fileVersion: function (value) { return versionBase + GIT_COUNT; },
            informationalVersion: function (value) { return GIT_COUNT + '.' + GIT_HASH; }
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', function () {
    // place code for your default task here
});