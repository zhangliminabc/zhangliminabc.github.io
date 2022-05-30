/**
 * 按照规定的次序依次完成请求，一般用于带有依赖关系的请求
 */

function mockRequest(pFnList) {

    const len = pFnList.length;
    const result = new Array(len).fill(false);
    let start = 0
    return new Promise((resolve, reject) => {
        const sendReq = () => {
            const curFn = pFnList.shift()
            const then = curFn.then
            console.log(`开始 ${start}`, new Date().toLocaleString());
            if (then && typeof then === 'function') {
                then.call(curFn, function(value) {
                    result[start] = value
                    console.log(`完成 ${start}`, new Date().toLocaleString());
                    start += 1
                    if (start < len) {
                        sendReq()
                    } else {
                        resolve(result)
                    }
                }, reject)
            }
        }

        sendReq()
    })
}

const plsit = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(val => {
    return new Promise((resolve, reject) => {
        resolve(val)
    })
})

mockRequest(plsit).then(res => {
    console.log(res)
})