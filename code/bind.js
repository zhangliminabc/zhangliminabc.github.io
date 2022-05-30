Function.prototype.customBind = function() {

    var self = this;
    var context = Array.from(arguments)[0]
        // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function() {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }
}


var a = {
    b: 1
}

var b = 4

function getb() {
    console.log(this.b)
}

const c = getb.customBind(a)
c()