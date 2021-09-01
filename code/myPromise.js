// 遵循promiseA+ 规范自定实现promise


const PROMISE_STATE = {
    padding: 'padding',
    resolve: 'resolve',
    reject: 'reject',
}

class Promise {

    constructor(fn) {
        this.fn = fn;
        this._value = null;
        this._state = PROMISE_STATE.padding
        this.handlerFn()
    }

    /**
     * 执行初始入参函数
     * @returns: void
     */
    handlerFn(fn) {
        let done = false;
        try {
            fn(resolve, reject);
        } catch (error) {
            if (done) return
            done = true;
            this.reject(this.error)
        }
    }

    resolve(self, newValue) {
        const isObj = typeof newValue === 'object' || typeof newValue === 'function'
        if (newValue && isobj) {
            const then = newValue.then
            if (newValue instanceof Promise) {
                self._state = 3
                self._value = newValue
                return
            } else if (typeof then === 'function') {
                handlerFn(then.apply(newValue, arguments), self)
            }
        }
    }

    reject(error) {
        this._state = PROMISE_STATE.reject;
        this._value = error
    }
}

Promise.prototype.then = function(success, error) {
    const pros = new this.constructor(noop)

}

// const p = new Promise((resolve, reject) => {
//     resolve('111');
// })
// console.log(p)