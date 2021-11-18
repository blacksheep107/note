function isCircle(obj) {
    try {
        JSON.stringify(obj)
    } catch {
        return true;
    }
    return false;
}
var obj = { foo: { bar: { baz: { qux: {} } } } };
obj.foo.bar.baz.qux = obj.foo;
console.log(isCircle(obj))
// console.log(isCircle('23'))
