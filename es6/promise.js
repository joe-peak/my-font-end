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

const MyPromise = function(fn) {
    let callback = [];
    this.then = function(handler) {
        callback.push(handler);
        //链式调用
        return this;
    };

    const resolve = function(value) {
        // 延迟机制 防止then方法注册回调晚于resolve函数执行(构造函数内同步执行时)
        setTimeout(() => {
            callback.forEach(callback => {
                callback(value);
            });
        },0);
    };

    fn(resolve);
};

// const getLates = () => new MyPromise((resolve) => {
//     axios.get(url).then( res => {
//         resolve(res.data);
//     });
// });

// getLates().then(res => {
//     log(JSON.stringify(res));
// });
const getLates = () => new MyPromise((resolve) => {
    resolve({
        name: 'Joe'
    });
});

getLates().then(res => {
    log(JSON.stringify(res));
}).then(res => log('ok')).then(() => log('okay'));