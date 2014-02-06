namespace EM.Cloud.PuzzleGame.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;
    using Breeze.WebApi;
    using Models;
    using Newtonsoft.Json.Linq;

    [BreezeController]
    public class PuzzleGameController : ApiController {

        static readonly TimeSpan RefreshRate = TimeSpan.FromMinutes(60);
        private static readonly object Locker = new object();
        static DateTime _lastRefresh = DateTime.Now; // will first clear db at Now + "RefreshRate" 
        // static DateTime lastRefresh = DateTime.MinValue; // will clear when server starts

        readonly EFContextProvider<PuzzleGameContext> _contextProvider =
            new EFContextProvider<PuzzleGameContext>();

        public PuzzleGameController()
        {
            PeriodicReset();
        }

        // ~/breeze/todos/Metadata 
        [HttpGet]
        public string Metadata() {
            return _contextProvider.Metadata();
        }

        // ~/breeze/todos/Todos
        // ~/breeze/todos/Todos?$filter=IsArchived eq false&$orderby=CreatedAt  
        [HttpGet]
        public IQueryable<PuzzleGameItem> Todos() {
            return _contextProvider.Context.Todos;
        }

        // ~/breeze/todos/SaveChanges
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle) {
            return _contextProvider.SaveChanges(saveBundle);
        }

        // ~/breeze/todos/purge
        [HttpPost]
        public string Purge()
        {
            PuzzleGameDatabaseInitializer.PurgeDatabase(_contextProvider.Context);
            return "purged";
        }

        // ~/breeze/todos/reset
        [HttpPost]
        public string Reset()
        {
            Purge();
            PuzzleGameDatabaseInitializer.SeedDatabase(_contextProvider.Context);
            return "reset";
        }

        /// <summary>
        /// Reset the database to it's initial data state after the server has run 
        /// for "RefreshRate" minutes.
        /// </summary>
        private void PeriodicReset()
        {
            if ((DateTime.Now - _lastRefresh) > RefreshRate)
            {
                lock (Locker)
                {
                    if ((DateTime.Now - _lastRefresh) > RefreshRate)
                    {
                        _lastRefresh = DateTime.Now;
                        Reset();
                    }
                }
            }
        }
    }
}