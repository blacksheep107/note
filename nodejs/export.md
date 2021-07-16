# export和module.export
https://www.jianshu.com/p/aaf912d7329e
- module.exports和exports是commonJS规范，export和export default是ES6模块规范。
# commonJS
- exports等于module.exports，相当于在js文件头部有个module对象。exports是一个对象，所以可以exports多个值。
```
// 暴露.js
exports.fn1;
exports.fn2;
exports.fn3;
// 引用.js
var fns = require('暴露.js');
fns.fn1(); ...
// 相当于
exports = {fn1,fn2,fn3}
// 相当于 
modules.exports = {fn1, fn2,fn3}
```
- exports指向的是module.exports的引用。
- require返回的是module.exports
# ES6规范
```
let name = 'xiaoming';
let age = 18;
export {name, age}
// 引用.js
import {name, age} from '暴露.js'；
```
```
// 暴露.js
let fn1 = function() {console.log('sayHi')};
export { fn1 as sayHi };
// 引用.js
import { sayHi } from '暴露.js'
```
- export default导出不需要知道变量名字，
```
// 如果一个js模块文件就只有一个功能， 那么就可以使用export default导出
// 暴露.js
export default {
  name: 'xiaoming'，
  age: 18
}; 
// 引用.js
import person from '暴露.js'
```
# 总结
- 用export的时候，import 要加{}
- import {func} from './a.js'
- module.exports=xxx相当于导出某个函数，在另一个文件中引用后可以直接调用。
- exports.xxx和module.exports.xxx相当于把函数挂载在对象上，在另一个文件中引用后用过调用对象属性和方法使用。
