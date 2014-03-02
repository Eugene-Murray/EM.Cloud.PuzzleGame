define(['plugins/router', 'knockout'], function(router, ko) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId:'PuzzleGame',
            fromParent:true
        }).map([
            { route: '', moduleId: 'Admin/index', title: 'Admin', type: 'intro' },
            { route: 'Admin', moduleId: 'Admin/index', title: 'Admin', type: 'intro', nav: true },
            { route: 'ChooseLocation',  moduleId: 'ChooseLocation/index',   title: 'Simple List',           type: 'intro',      nav: true },
            { route: 'Easy',            moduleId: 'Easy/index',             title: 'Easy',                  type: 'intro',      nav: true},
            { route: 'Hard',            moduleId: 'Hard/index',             title: 'Hard',                  type: 'intro',      nav: true },
            { route: 'VeryHard',        moduleId: 'VeryHard/index',         title: 'Very Hard',             type: 'intro' ,     nav: true },
            { route: 'Result',          moduleId: 'Result/index',           title: 'Result',                type: 'intro',      nav: true },
            { route: 'RatingsBestTime', moduleId: 'RatingsBestTime/index',  title: 'Animated Transition',   type: 'intro',      nav: true }
        ]).buildNavigationModel();

    return {
        router: childRouter,
        introSamples: ko.computed(function() {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                return route.type == 'intro';
            });
        }),
        detailedSamples: ko.computed(function() {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function(route) {
                return route.type == 'detailed';
            });
        })
    };
});