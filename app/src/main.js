angular.module('app', ['ngNewRouter'])
    .component('test', {
        controller: function () {
            this.testing = 123;
            console.log('B');
        },
        template: `
         <h1>Hey There</h1>
        `
    })