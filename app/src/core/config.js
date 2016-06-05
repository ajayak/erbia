{
    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[ERBIA Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Erbia Offline Auditing',
        version: '0.0.1'
    };

    core.value('config', config);

    core.config(configure);

    function configure($logProvider, $routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'Erbia: ';
        var resolveAlways = { /* @ngInject */
            ready: function (dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
}