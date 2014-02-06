namespace EM.Cloud.PuzzleGame.Models
{
    using System.Data.Entity;

    public class PuzzleGameContext : DbContext 
    {
        // DEVELOPMENT ONLY: initialize the database
        static PuzzleGameContext()
        {
            Database.SetInitializer(new PuzzleGameDatabaseInitializer());
        }
        public DbSet<PuzzleGameItem> Todos { get; set; }
    }
}