(function () {
    'use strict';

    angular
        .module('app.pages', [
            'ui-router'
        ]).config(config)
        
        config.$inject = ['$stateProvider'];
        
        /* @ngInject */
        function config ($stateProvider) {
            $stateProvider
                .state(pages)
                .state(main);

            var pages = {
                name: 'pages',
                abstract: true,
                url: '/',
                templateUrl: 'components/pages/pages.html'
            };

            var main = {
                name: 'pages.name',
                url: '',
                templateUrl: 'components/pages/main.html'
            }
        }

})();