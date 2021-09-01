/**
 * 函数柯里化
 * 
 * 实现 add(1)(2)(3)(4)(5)
 */

function add(value) {
    let sum = 0

    const fn = () => {
        sum = sum + value;
    }
    return (newValue) => {

    }
}

function add(a, b) {
    return a + b
}