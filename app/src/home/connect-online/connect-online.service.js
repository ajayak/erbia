{
    angular.module('app.home')
        .service('connectOnlineService', ConnectOnlineService);

    function ConnectOnlineService($timeout) {
        return {
            connectOnline
        };
        
        function connectOnline(username, password){
            console.log(username, password);
            
            return new Promise((resolve, reject)=>{
                if (username === 'test') {
                    $timeout(()=>{
                        resolve('Success');
                    },1000, false);
                }else{
                    reject('Error');
                }
            })
        }
    }
}