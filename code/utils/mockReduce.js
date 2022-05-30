/**
 * 手写一个reduce函数
 */

Array.prototype.customReduce = function(fn, initValue) {
    const data = this
    if (data.length <= 0) return initValue
    let len = data.length
    for (let i = 0; i < len; i++) {
        const cur = data[i]
        const newInitValue = fn(initValue, cur, i)
        initValue = newInitValue
    }
    return initValue
}


const data = [1, 2, 3, 4].customReduce((pre, cur) => {
    pre[cur] = cur
    return pre
}, {})

console.log(data)