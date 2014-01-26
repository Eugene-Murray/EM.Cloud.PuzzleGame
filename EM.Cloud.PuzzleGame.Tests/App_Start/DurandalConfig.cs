using System;
using System.Web.Optimization;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(EM.Cloud.PuzzleGame.Tests.App_Start.DurandalConfig), "PreStart")]

namespace EM.Cloud.PuzzleGame.Tests.App_Start
{
    public static class DurandalConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            DurandalBundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}