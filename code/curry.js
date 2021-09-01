function curry(fn, ...args) {
    const params = Array.prototype.slice.call(arguments, 1);
    if (params.length >= fn.length) {
        return fn(...args)
    } else {
        return (args) => curry(fn, ...params, args)
    }
}


function add1(x, y, z) {
    console.log(x, y, z) // 1,2,3
    return x + y + z
}

console.log(curry(add1, 1)(2)(3)) // 6