# AssemblyVersion from Git

Sample package.json and gulpfile.js for incorporating Git version info into AssemblyVersion on application build

Creates AssemblyVersion.VersionNumber.cs files, similar to

    using System.Reflection;

    [assembly: AssemblyVersion("1.0.0.5")]
    [assembly: AssemblyFileVersion("1.0.0.5")]
    [assembly: AssemblyInformationalVersion("5.7d5820fa856512589e5b43c951e8a1d16e9c9e92")]
