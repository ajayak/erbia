{
    angular.module('app')
        .config(configureDefaultRoutes);

    function configureDefaultRoutes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                template: "<home></home>"
            });
    }
}