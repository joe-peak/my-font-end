define(function (require) {
    var $ = require('jquery');
    var api = require('API');
    return {
        getDayInfo: function () {
            return $.get(api.dayinfo);
        },
        getTypeInfo: function () {
            return $.get(api.typeinfo);
        }
    }
});