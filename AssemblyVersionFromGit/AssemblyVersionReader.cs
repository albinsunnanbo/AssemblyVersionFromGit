using System;
using System.Linq;
using System.Reflection;

namespace AssemblyVersionFromGit
{
    public static class AssemblyVersionReader
    {
        /// <summary>
        /// Formats the assembly version from the specified assembly.
        /// Requires that the AssemblyInfo.cs file contains the AssemblyInformationalVersion attribute.
        /// </summary>
        /// <param name="assembly"></param>
        /// <returns></returns>
        public static string FormatApplicationVersion(this Assembly assembly)
        {
            var version = assembly.GetCustomAttributes(typeof(AssemblyInformationalVersionAttribute), false)
                .OfType<AssemblyInformationalVersionAttribute>().FirstOrDefault();

            if (version == null)
            {
                return noVersion;
            }

            // Truncate long git hashes before display
            var printVersion = version.InformationalVersion;
            if (printVersion != null)
            {
                var dotLocation = printVersion.IndexOf(".", StringComparison.Ordinal);
                if (dotLocation >= 0)
                {
                    const int hashLength = 8;
                    var targetLength = dotLocation + 1 + hashLength;
                    if (printVersion.Length > targetLength)
                    {
                        printVersion = printVersion.Substring(0, targetLength);
                    }
                }
            }
            return printVersion;
        }

        private const string noVersion = "No version";
    }
}
