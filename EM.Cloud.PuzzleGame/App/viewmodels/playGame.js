//TODO: Inject dependencies
define(['plugins/router', 'durandal/app'],
    function (router, app) {
        // Internal properties and functions
        var caat = null;
       
        // Reveal the bindable properties and functions
        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            goBack: goBack,
            title: 'Play Game'
        };

        return vm;
        
        function activate(id, querystring)
        {

            caat = new CAAT.ImagePreloader().loadImages(
            [
                { id: 'image', url: '../../Content/gameImages/USA/USA.7.2.jpg' }
            ],
            function (counter, images) {
                if (counter === images.length) {

                    var director = new CAAT.Director().initialize(800, 600);
                    director.enableResizeEvents(CAAT.Director.prototype.RESIZE_PROPORTIONAL);
                    director.setImagesCache(images);
                    director.addAudio("11", "11.mp3").addAudio("12", "12.mp3").addAudio("win", "win.mp3");
                    var scene = director.createScene();

                    var puzzle = new Puzzle.Game().setImage(director, director.getImage("image")).setTable(3, 4, 800, 600);
                    scene.addChild(puzzle);

                    scene.createTimer(
                        0, 3000,
                        function () {
                            puzzle.start();
                        }
                    )
                    CAAT.loop(60)
                }
            });
        }

        function canDeactivate() {
            caat = null;
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }

        function goBack(complete) {
            router.navigateBack();
        }
    });