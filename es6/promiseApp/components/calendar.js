define(function (require) {
    var request = require('request');
    request.getDayInfo().then(function (res) {
        console.log(res); 
    });
});