function mockPromiseAll(promiselist) {
    const result = new Array(promiselist.length).fill(undefined);
    const len = promiselist.length;
    let totalLen = promiselist.length
    return new Promise((resolve, reject) => {
        const response = (i, curValue) => {
            try {
                if (curValue && (typeof curValue === 'object' || typeof curValue === 'function')) {
                    const then = curValue.then
                    if (then && typeof then === 'function') {
                        then.call(curValue, (res) => {
                            response(i, res)
                        }, reject)
                        return
                    }
                }
                result[i] = curValue
                if (--totalLen === 0) {
                    resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        }
        for (let i = 0; i < len; i++) {
            const curPromise = promiselist[i];
            response(i, curPromise)
        }

    })
}

const plsit = [1, 2, 3, 4].map(val => {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
})


const p = mockPromiseAll(plsit).then(res => {
    console.log(res)
})

console.log(p)