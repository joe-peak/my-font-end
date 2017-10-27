// import axios from 'axios';
const axios = require('axios');
const log = output => {
    console.log(output);
};

const url = 'https://news-at.zhihu.com/api/4/news/latest';
// const getLates = () => new Promise((resolve, reject) => {
//     axios.get(url).then( res => {
//         resolve(res.data);
//     });
// });

// getLates().then(res => {
//     log(JSON.stringify(res));
// }).catch(log);

// 自定义极简promise雏形
const MyPromise0 = function(fn) {
    let callbacks = [];
    let status = 'pendding';
    let value = null;
    this.then = function (handler) {
        // return new Promise(resolve => {
        //     if (status === 'pendding') {
        //         callbacks.push(handler);
        //     } else {
        //         handler(value);
        //     }
        // });
        if (status === 'pendding') {
                callbacks.push(handler);
            } else {
                handler(value);
            }
        // 链式调用
        // return this;
    };

    const resolve = function (newValue) {
        // 修改状态
        status = 'fulfilled';
        value = newValue;
        // 延迟机制 防止then方法注册回调晚于resolve函数执行(构造函数内同步执行时)
        setTimeout(() => {
            log(callbacks.length)
            callbacks.forEach(callback => {
                callback(value);
            });
        },0);
    };

    fn(resolve);
};


function MyPromise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {
        return new Promise(function (resolve) {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    };

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if(!callback.onFulfilled) {
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulfilled(value);
        callback.resolve(ret);
    }

    
    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve);
}

// const getLates = () => new Promise((resolve) => {
//     axios.get(url).then( res => {
//         resolve(res.data);
//     });
// });

// getLates().then(res => {
//     log(JSON.stringify(res));
// });

const getLatest = () => new MyPromise((resolve) => {
    // resolve({
    //     name: 'Joe'
    // });

    axios.get(url).then( res => {
        resolve(res.data);
    });
});

getLatest().then(res => {
    log(JSON.stringify(res));
    // return 'hahaha';
}).then(res => log(res)).then(() => log('okay'));