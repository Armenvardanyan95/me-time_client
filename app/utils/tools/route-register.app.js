(function () {
    'use strict';

    angular
        .module('registerStateApp', []).provider("$registerState", function ($stateProvider) {
        var routes = [];

        this.$set = function (stateProvider) {
            var satetProviders = {
                states: stateProvider
            }

            routes.push(satetProviders);
        };

        this.$get = function () {
            return angular.forEach(routes, function (route) {
                angular.forEach(route.states, function (state) {
                    $stateProvider.state(state.state, {
                        parent: state.parent,
                        moduleName: parent,
                        stateName: child,
                        name: state.pageName,
                        url: state.url,
                        views: state.views,
                        pageInfo: state.pageInfo
                    });
                });
            });
        };
    });

})();