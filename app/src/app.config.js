{
    const internetRequiredStates = ['connect-online'];

    angular.module('app')
        .run(validateRoutes);

    function validateRoutes($rootScope) {
        Offline.check();
        $rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
            if (internetRequiredStates.indexOf(toState.name) === -1) return;
            Offline.check();
            if (Offline.state !== 'down') return;
            e.preventDefault();
            Materialize.toast('You seems to be offline. Please verify your internet connection to proceed further.', 3000, 'rounded');
        });
    }
}