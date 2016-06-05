{
    angular.module('app.home')
        .component('connectOnline', {
            templateUrl: 'src/home/connect-online/connect-online.tpl.html',
            controller: ConnectOnlineController,
            controllerAs: 'vm'
        });

    function ConnectOnlineController(connectOnlineService) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.loginOnline = loginOnline;

        function loginOnline() {
            connectOnlineService
                .connectOnline(vm.username, vm.password)
                .then(success => console.log(success))
                .catch(err => console.log(err));
        }
    }
}