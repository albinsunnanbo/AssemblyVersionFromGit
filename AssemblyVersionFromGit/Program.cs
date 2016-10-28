using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssemblyVersionFromGit
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Version:");
            Console.WriteLine(typeof(Program).Assembly.FormatApplicationVersion());
            Console.WriteLine();
            Console.WriteLine("Done, press any key to continue");
            Console.ReadKey();
        }
    }
}
