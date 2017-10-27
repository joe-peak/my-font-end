const Promise = function(fn) {
    let callbacks = [];
    let status = 'PENDDING';
    let value = null;
    this.resolve = null;
    let self = this;
    this.then = callback => {
        return new Promise(resolve => {
            self.resolve = resolve;
            if (status === 'PENDDING') {
                callbacks.push(callback);
                return;
            }
            
            if(!callback) {
                resolve(value);
                return;
            }

            const ret = callback(value);
            resolve(ret);
        });
    }

    function resolve(newValue) {
        //  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        //     var then = newValue.then;
        //     if (typeof then === 'function') {
        //         then.call(newValue, self.resolve);
        //         return;
        //     }
        // }
        value = newValue; 
        status = 'fulfilled';
        setTimeout(() => {
            callbacks.forEach(callback => {
                self.resolve(callback(value));
            });
        }, 0);
    }
    fn(resolve);
}

const axios = require('axios');
const log = output => {
    console.log(output);
};

const url = 'https://news-at.zhihu.com/api/4/news/latest';
const getLatest = () => new Promise((resolve) => {
    axios.get(url).then( res => {
        resolve(res.data);
    });
});

getLatest().then(res => {
    log(JSON.stringify(res));
    log('-----分割线-----');
    return JSON.stringify(res);
}).then(res => {
    log(res);
    log('-----分割线-----');
    return 'hello promise'
}).then(res => log(res));