


//TODO: Inject dependencies
define(['plugins/router', 'durandal/app'],
    function (router, app) {
        // Internal properties and functions
        var caat = null;
       
        // Reveal the bindable properties and functions
        var vm = {
            activate: activate,
            attached: attached,
            compositionComplete: compositionComplete,
            canDeactivate: canDeactivate,
            goBack: goBack,
            title: 'Play Game'
        };

        return vm;
        
        function attached()
        {
            //var x = "goo";

            //$(document).ready(function () {
            //    var canvas1 = document.getElementById('testDiv1');
            //    var appHost = $('#applicationHost.page-host.durandal-wrapper#testDiv1')[0];
            //    var c = $("canvas:first")[0];

            //});

            caat = new CAAT.ImagePreloader().loadImages(
            [
                { id: 'image', url: '../../Content/gameImages/USA/USA.7.2.jpg' }
            ],
            function (counter, images) {
                if (counter === images.length) {

                    var canvas1 = document.getElementById('puzzleCanvas');
                    var canvas = $('#puzzleCanvas')[0];
                    var director = new CAAT.Director().initialize(800, 600, canvas);
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

        function compositionComplete()
        {
            //var x = "goo";

            //$(document).ready(function () {
            //    var canvas1 = document.getElementById('testDiv1');
            //    var appHost = $('#applicationHost.page-host.durandal-wrapper#testDiv1')[0];
            //    var c = $("canvas:first")[0];

            //});
        }

        function activate(id, querystring)
        {
            
            

            
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