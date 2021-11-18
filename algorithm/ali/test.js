function isCircle(obj) {
    function findCircle(target, src) {
        const source = src.concat([target]);
        // console.log(source)  // 查过的对象地址扔进去 找到一样地址的就是引用
        for (let key in target) {
            if (typeof target[key] === 'object') {
                if (source.indexOf(target[key]) !== -1 || findCircle(target[key], source)) {
                    return true;
                }
            }
        }
        return false;
    }
    return typeof obj === 'object' ? findCircle(obj, []) : false;
}
var obj = { foo: { bar: { baz: { qux: {} } } } };
obj.foo.bar.baz.qux = obj.foo;
console.log(isCircle(obj));
