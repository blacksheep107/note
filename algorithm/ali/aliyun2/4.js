function incrementGenerator() {
    /* 功能实现 */
    let sth = {
        a: 0,
        get b() {
            this.a+=1;
            console.log(this.a, 'a')
            return this.a+=1;
        }
    }
    return sth.b;
}
// 测试
var a = incrementGenerator();
console.log(a)
console.log(a)
var result = (a == 1 && a == 2 && a == 3);
console.log(result); // true

let a = new Set()
