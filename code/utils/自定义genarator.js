function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function b() {
    return 'data';
}

function a() {
    return _a.apply(this, arguments);
}

function _a() {
    _a = _asyncToGenerator(function*() {
        const result = yield b();
    });
    return _a.apply(this, arguments);
}

/**
 * 自定义genarator函数
 */

function* gen() {
    // const value = yield b();
    const value = yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('我延迟了一秒')
            console.log("这是宏任务队列")
        }, 1000)
        console.log("这是微任务队列")
    });
    return value
}

function asyncToGenerator(gen, resolve, reject, _next, _throw, key, args) {
    let info, done;
    try {
        info = gen[key](args);
        done = info.done;
    } catch (error) {
        reject(error)
        return
    }
    const value = info.value;
    if (done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw)
    }
}

function mockGenerator(fn) {
    return function() {
        const self = this;
        const arg = arguments
        return new Promise((resolve, reject) => {
            const gen = fn.apply(self, arg)

            function _next(value) {
                asyncToGenerator(gen, resolve, reject, _next, _throw, 'next', value);
            }

            function _throw(error) {
                asyncToGenerator(gen, resolve, reject, _next, _throw, 'error', error);
            }

            _next(undefined)
        })
    }
}

const mockFn = mockGenerator(gen)

const data = mockFn().then((res) => {
        console.log(res, 'res')
    })
    // console.log(data, 'data')

// const demo = async() => {
//         let result = await new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve('我延迟了一秒')
//                 console.log("这是宏任务队列")
//             }, 1000)
//             console.log("这是微任务队列")
//         });
//         console.log('我由于上面的程序还没执行完，先不执行“等待一会”');
//         return result;
//     }
//     // demo的返回当做Promise
// demo().then(result => {
//     console.log('输出', result);
// })