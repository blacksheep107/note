function isCyclic (obj) {
    /* 代码实现 */
    let arr = [];
    function dfs(obj) {
        arr.push(obj);
        console.log(arr)
        Object.keys(obj).forEach(key => {
            console.log(obj[key])
            if(arr.indexOf(obj[key]) !== -1) {
                return true;
            }
            dfs(obj[key]);
        })
        return false;
    }
    return dfs(obj);
}
var obj = { foo: { bar: { baz: { qux: {} } } } };
obj.foo.bar.baz.qux = obj.foo;
console.log(isCyclic(obj))

