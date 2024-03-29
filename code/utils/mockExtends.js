function Parent(name, age) {
    this.name = name;
    this.age = age;
    this.color = []
}

Parent.prototype.getColor = function() {
    return this.color
}

function Sub(sex) {
    this.sex = sex
}

function Sub2(sex) {
    this.sex = sex
}

/**
 * 原型链式继承: 以父类的实例为子类的原型，同时重置子类原型中的coonstrucor为子类的构造函数
 */
function prototypeInherited(Sub, Parent) {
    Sub.prototype = new Parent('zhanglimin', 26)
    Sub.prototype.constructor = Sub
}

prototypeInherited(Sub, Parent)
const instance = new Sub()
instance.color.push('sub')

const instance2 = new Sub()

/**
 * 由此可见， 原型式继承带来的问题是
 * 1. 父类的引用属性会被所子类实例所共享
 */
console.log(instance.color) // [sub]
console.log(instance2.color) // [sub]


/**
 * 构造函数式继承: 在子类中通过call或者apply调用父类函数，改变父类this指向从而在子类中保存父类属性的副本
 */
function Sub(sex) {
    Parent.call(this, 'zhanglimin', 26) // 通过call/apply调用父类构造函数从而将父类的this指向子类
    this.sex = sex
}

function Sub2(sex) {
    Parent.call(this, 'zhanglimin', 26)
    this.sex = sex
}

const instance1 = new Sub()
instance1.color.push('sub')
console.log(instance1.color) // [sub]

const instance2 = new Sub2()
instance2.color.push('sub2')
console.log(instance2.color) // [sub2]

/**
 * 由此可见， 构造函数继承不能继承父类原型，方法都在构造函数中继承
 */
console.log(instance1.getColor) // undefined


/**
 * 组合继承: 将原型式继承和构造函数式继承的组合
 */

function Sub() {
    Parent.call(this, '张利民', 26)
}

function Sub2() {
    Parent.call(this, 'zhanglimin', 26)
}

prototypeInherited(Sub, Parent)
const instance1 = new Sub()
instance1.color.push('sub')
console.log(instance1.getColor()) // [sub]

const instance3 = new Sub()
console.log(instance3.getColor()) // []

prototypeInherited(Sub2, Parent)
const instance2 = new Sub2()
instance2.color.push('sub2')
console.log(instance2.getColor()) // [sub2]


/**
 * 原型式继承: 
 */

function prototypeInherited(obj) {
    // 临时构建一个构造函数
    function F() {}
    // 将构造函数的原型设置为obj
    F.prototype = obj
        // 返回函数的实例
    return new F()
}

/**
 *  寄生式继承
 */
function prasiticInherited(obj) {
    let clone = Object.create(obj)
    clone.sayhi = function() {
        alert('hi')
    }
    return clone
}

/**
 * 寄生组合继承
 */
function parasiticCombinationInherited(sub, sup) {
    const target = Object.create(sup.prototype)
    target.constructor = sub
    sub.prototype = target
}

function Sub(age) {
    Parent.call(this, '张利民', 26)
    this.age = age
}

parasiticCombinationInherited(Sub, Parent)
const instance = new Sub(28)
instance.color.push('sub')
console.log(instance.age, instance.getColor()) // 28, [sub]


/**
 * 综上所述： 实现自定义的extends函数
 */
function mockExtends(child, parent) {
    if (typeof child !== 'function' && parent !== null) {
        throw new TypeError('Super expression must either be null or a function')
    }
    child.prototype = Object.create(parent && parent.prototype, {
        constructor: {
            value: child,
            writable: true,
            configurable: true
        }
    })
    if (parent) {
        // child.__proto__ = parent
        Object.setPrototypeOf(child, parent)
    }
}


/**
 *  接下来看看babel对于es6中 extends 操作符的编译
 */

// ES6写法
class A {
    constructor() {}
}

class B extends A {
    constructor() {
        super()
    }
}

/**
 * babel编译之后的es5代码
 */
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; };
    return _setPrototypeOf(o, p);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

let A = function A() {
    "use strict";

    _classCallCheck(this, A);
};

let B = /*#__PURE__*/ function(_A) {
    "use strict";

    // extends的核心
    _inherits(B, _A);

    // 这个参照我的 对super 讲解一章
    var _super = _createSuper(B);

    function B() {
        _classCallCheck(this, B);
        return _super.call(this);
    }

    return B;
}(A);