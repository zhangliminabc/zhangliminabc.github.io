/**
 * 模拟实现instanceof
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function mockInstanceof(left, right) {
    const pro = right.prototype
    let lefePro = left.__proto__

    while (true) {
        if (left === null || left === undefined)
            return false
        if (pro === lefePro)
            return true
        left = left.__proto__
    }
}