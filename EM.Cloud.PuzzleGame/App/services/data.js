//TODO: Inject dependencies
define(['config'],
    function (config) {
        // Internal properties and functions

        // Reveal the accessible members
        var data = {
            //TODO: Modify for you API
            getPersonById: getPersonById
        };
        return data;

        function getPersonById(id) {

        };
    });