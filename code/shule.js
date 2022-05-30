// var a = 1;
// var obj = {
//     a: 2,
//     getA() {
//         return this.a;
//     }
// }
// console.log(obj.getA());


const timer = function(order) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve()
        }, order)
    })
}

const schedule = new Schedul(2)

const addTask = function(500, 1) {
    schedule.add(() => {}).then(res => {
        console.log(res)
    })
}


class Schedul {

    constructor() {}

    add(task) {}

    _schedule() {}
}

火焰图

let /
const /
var

    箭头函数和普通函数

递归处理循环引用问题