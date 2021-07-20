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
