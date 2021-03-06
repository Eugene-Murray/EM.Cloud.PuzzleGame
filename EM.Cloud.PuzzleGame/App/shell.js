﻿define(['plugins/router'], function (router) {
    return {
        router: router,
        activate: function () {
            return router.map([
                { route: ['', 'home'], moduleId: 'hello/index', title: 'Hello World', nav: true },
	            { route: 'mybootstrap', moduleId: 'mybootstrap/index', title: 'Bootstrap', nav: true },
	            { route: 'goo', moduleId: 'goo/index', title: 'goo', nav: true },
                { route: 'view-composition',            moduleId: 'viewComposition/index',  title: 'View Composition',  nav: true },
                { route: 'modal',                       moduleId: 'modal/index',            title: 'Modal Dialogs',     nav: true },
                { route: 'event-aggregator',            moduleId: 'eventAggregator/index',  title: 'Events',            nav: true },
                { route: 'widgets',                     moduleId: 'widgets/index',          title: 'Widgets',           nav: true },
                { route: 'master-detail',               moduleId: 'masterDetail/index',     title: 'Master Detail',     nav: true },
                { route: 'knockout-samples*details', moduleId: 'ko/index', title: 'Knockout Samples', nav: true, hash: '#knockout-samples' },
	            { route: 'mybreeze', moduleId: 'mybreeze/index', title: 'Breeze', nav: true },
                { route: 'PuzzleGame*details', moduleId: 'PuzzleGame/index', title: 'PuzzleGame', nav: true, hash: '#PuzzleGame' }
            ]).buildNavigationModel()
              .mapUnknownRoutes('hello/index', 'not-found')
              .activate();
        }
    };
});