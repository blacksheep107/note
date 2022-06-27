# Angular元素
- Angular元素就是打包成自定义元素的Angular组件，自定义元素就是一套与具体框架无关的用于定义新HTML元素的web标准。
- 自定义元素允许定义一个由js代码创建和控制的标签，浏览器维护一个自定义元素的注册表CustomElementRegistry，它把一个可实例化的js类映射到html标签上（描述有点像vue的虚拟dom
## 工作原理
- 使用createCustomElement()函数把组件转换成一个可注册成浏览器中自定义元素的类，注册完这个配置好的类后就可以像使用内置HTML元素一样使用这个新元素了。
```html
<my-popup message="Use Angular!"></my-popup>
```
## 把组件转换为自定义元素
- 
