- 把axios封装起来，在文件中创建axios实例，并设置baseUrl
```
const instance=axios.create({
    baseURL:'url'
})
```
- 在main.js中加载：
```
import axios from './axios.js'
```
- 把axios挂载到Vue原型上：
```
Vue.prototype.$ajax=axios
```
- :class="{active:ActiveValue}"表示当ActiveValue为真是才有active，如果变量名和类名相同，可以只写一个，如:class="{active}"
- 做到一个:class="{animatedTop
}"的，data里有一个animatedTop，style里也有一个.animatedTop，可以用这个值控制是否滚动。
