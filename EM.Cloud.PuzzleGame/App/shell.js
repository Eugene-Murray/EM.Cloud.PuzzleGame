define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true },
                { route: 'All Pics', moduleId: 'viewmodels/allPics', nav: true },
                { route: 'Holiday Suggestions', moduleId: 'viewmodels/holidaySuggestions', nav: true },
                { route: 'Interesting Facts', moduleId: 'viewmodels/interestingFacts', nav: true },
                { route: 'Play Game', moduleId: 'viewmodels/playGame', nav: true },
                { route: 'Result', moduleId: 'viewmodels/result', nav: true },
                { route: 'Select Pic', moduleId: 'viewmodels/selectPic', nav: true },
                { route: 'Select Region', moduleId: 'viewmodels/selectRegion', nav: true },
                { route: 'Sign Up', moduleId: 'viewmodels/signup', nav: true },
                { route: 'knockout-samples*details', moduleId: 'ko/index', title: 'Knockout Samples', nav: true, hash: '#knockout-samples' },
                { route: 'view-composition', moduleId: 'viewComposition/index', title: 'View Composition', nav: true },
                { route: 'modal', moduleId: 'modal/index', title: 'Modal Dialogs', nav: true },
                { route: 'event-aggregator', moduleId: 'eventAggregator/index', title: 'Events', nav: true },
                { route: 'widgets', moduleId: 'widgets/index', title: 'Widgets', nav: true }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});