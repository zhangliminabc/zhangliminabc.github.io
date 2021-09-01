function Test(name, age) {
    this.name = name;
    this.age = age;
    // return { name, age }
}

Test.prototype.getName = function() {
    console.log(this)
    return this.name;
}

Test.prototype.getAge = function() {
    return this.age;
}

Test.prototype.setName = function(name) {
    this.name = name;
}

Test.prototype.setAge = function(age) {
    this.age = age;
}

// const instance = new Test('zhanglimin', 26);
const instance = mockNew(Test, 'zhanglimin', 26)
console.log(instance.__proto__ === Test.prototype) // false


function mockNew(Con, ...args) {
    let obj = {}
        // 解释了static类型的方法不能通过this调用的原因
    Object.setPrototypeOf(obj, Con.prototype)
        // apply方法调用一个具有给定this值的函数
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
}