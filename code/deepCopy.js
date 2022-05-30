function deepCopy(obj, map = new Map()) {
    if (typeof obj === 'object') {
        let res = Array.isArray(obj) ? [] : {};
        if (map.get(obj)) {
            return map.get(obj);
        }
        map.set(obj, res);
        for (var i in obj) {
            res[i] = deepCopy(obj[i], map);
        }
        return map.get(obj);
    } else {
        return obj;
    }
};
var A = { a: 1 };
A.A = A;

var B = deepCopy(A);
console.log(B); //{a: 1, A: {a: 1, A: {…}}