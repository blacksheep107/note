# store读，写
- store只是vuex的一部分，目前只用到store
- store文件夹下, index.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  userInfo: null,
  isBusShown: false,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {},
})

```
- 正常创建的组件可以直接读写
```javascript
    this.$store.state.isBusShown = !this.$store.state.isBusShown;
```
- 用Vue.extend调用方法实例化的组件，取不到全局挂载的vue对象下的store实例。
```javascript
// 创建组件
const Ele = Vue.extend(Bus)
const ele = new Ele({ propsData: { data: data }, store: this.$store }).$mount().$el
// 组件中调用store
this.$store.state.isBusShown = false;
```
