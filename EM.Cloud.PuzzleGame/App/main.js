

requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions'//,
        //'bootstrap': '../lib/bootstrap/js/bootstrap'
        //'jquery': '../lib/jquery/jquery-1.9.1'
        //'ko': '../lib/knockout/knockout-2.3.0',
        //'knockout': '../lib/knockout/knockout-2.3.0',
        //'q': '../Scripts/q',
        //'breeze': '../Scripts/breeze.debug'
        
    }//,
    //shim: {
    //    'bootstrap': {
    //        deps: ['jquery'],
    //        exports: 'jQuery'
    //    }
    //}
});

define('jquery', function() { return jQuery; });
define('knockout', ko);
define('Q', Q);
define('breeze', breeze);
//define('bootstrap', bootstrap);


define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Samples';

    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: {
            kinds: ['expander']
        }
    });

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application.
        app.setRoot('shell');
    });
});