define(function(require) {
    return function(img) {
        return new Promise(function (resolve, reject) {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = function(e) {
                        resolve(e);
                    };

                    img.onerror = function(e) {
                        reject(e);
                    }
                }
        });
    };
});