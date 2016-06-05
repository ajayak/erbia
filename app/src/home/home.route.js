{
    angular.module('app.home')
        .config(configureDefaultRoutes);

    function configureDefaultRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('connect-online', {
                url: "/home-online",
                template: "<connect-online></connect-online>"
            })
            .state('connect-offline', {
                url: "/home-offline",
                template: "<connect-offline></connect-offline>"
            })
    }
}