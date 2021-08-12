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
# 生命周期钩子
- created在实例创建后执行，正常写法是created:function(){}，一般简写成created(){}，不要用箭头函数！箭头函数没有this，this会向上级查找。
- 之前遇到的地图init问题，地图没创建出来就是因为在created里面init了，因为初始化要获取到地图的div节点，created的时候节点还没创建，所以没获取到，放在mounted里就正常了。
- 模板中插入变量时，用{{}}，但html attribute里不能用双大括号，要用v-bind:id=""，或者简写成:id=""
- 模板表达式不能访问全局变量，只能访问全局变量的白名单。
Math Date等
# 动态参数
- 方括号作为指令参数
```
<a v-bind:[name]='url' />
```
这里的name作为一个表达式动态求值。
可以用在click和focus等。
- **浏览器会把attribute全部转为小写！！！**就是键名都会转为小写，
```
<a v-bind:[someAttr]="value" />
```
这里的someAttr在data里面必须对应一个someattr
- 修饰符modifier，指明一个指令应以特殊方式绑定
```
<form v-on:submit.prevent="onSubmit">...</form>
```
告诉指令对于触发的事件调用event.preventDefault
# 计算属性
- 如果有多处复杂逻辑不要放在模板中
```
<div>
    {{ message.split('').reverse().join('') }}
</div>
```
用计算属性替代
```
<div>
    {{reversedMessage}}
</div>
```
```
<script>
    export default {
        name:'App',
        data(){
            return {
                message: 'hello',
            }
        },
        computed: {
            reversedMessage: function(){
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>
```
- 也可以在methods里定义reversedMessage方法来达到同样效果。
- 不同：计算属性基于它们的响应式依赖进行**缓存**，只要相关响应式依赖发生改变时他们就会重新求值（达到**监听**的效果）
- 但只要依赖的属性不改变，它就不会更新
```
computed:{
    now: function(){
        return Date.now();
    }
}
```
Date.now()不是响应式依赖，多次调用返回的是相同的。
- 计算属性也可以用set给data里的数据重新赋值。
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
# 侦听属性
- 没有什么缓存问题吧，本身就是有依赖的值存在的，改变了才会调用。computed就是没有显示的写出来这个依赖的值。
```
<input v-model="question">
```
```
watch: {
    question: function(newQ,oldQ) {
        this.debouncedGetAnswer();
    }
},
created(){
    this.debouncedGetAnswer=_.debounce(this.getAnswer,500);
    // lodash的函数，限制操作频率用。防抖节流？
},
methods: {
    getAnswer(){
        var vm=this;
        axios.get('https://yesno.wtf/api').then(res=>{
            vm.answer=_.capitalize(res.data.answer)
            // 第一个字母转成大写
        })
    },
}
```
# Class和Style绑定
- 把对象传给:class
```
:class="{active: isActive, 'text-danger':hasError}" class="static"
```
可以和普通的class共存。
- 数组语法
```
<div :class="[isActive?activeClass:''], errorClass"></div>
```
在数组里也可以写对象语法。
- 绑定内联样式
```
<div :style="{color:activeColor, fontSize: fontSize+'px'}">
data(){
    return {
        activeColor:'red',
        fontSize:30
    }
}
```
看起来像css，但中间分隔的是逗号！
- 直接绑定一个样式对象
```
<div :style="styleObject"></div>
data: {
    styleObject: {
        color:'red',
        fontSize:'13px'
    }
}
```
然后在运行过程中改变这个对象，这样长的好看多了
- 可以给style提供一个包含多个值的数组，可以用来写适应
```
<div :style="{display: ['-webkit-box', '-ms-flexbox', 'flex']}"></div>
```
只会渲染浏览器支持的那个
- 用key管理可复用元素。这个问题好像遇到过，切换的时候原来的值还保留着。都设置key就不会有了。
- 不要同时用v-if和v-for，v-for优先级高于v-if
- 不能检测数组和对象的变化。
    - 通过索引直接设置一个数组项或者修改数组长度，这些不是响应性的。
    - 解决：```Vue.set(items,index,newValue)```
    - ```this.$set(items,index,newValue)```
# 异步更新队列
- Vue更新DOM是异步的，侦听到数据变化，vue开启一个队列，缓冲在同一事件循环中发生的所有时间变更。比如同一个watcher被多次触发，只会被推入队列中一次。在下一个事件循环'tick'中，vue刷新队列并执行已去重的工作。
- 在更新this.somedata=''时，该组件不会立即重新渲染，组件会在下一个事件循环中更新。如果想对更新后的**DOM**状态做什么，就要用nextTick(callback)
- v-for的优先级高于v-if，也就是v-if会在每个v-for上跑一遍。只给部分项渲染时用。
# 事件处理
- 在内联语句中访问原始的DOM事件，用特殊变量$event
```:click="warn($event)"```
- 事件修饰符
     - ```:click.stop```阻止事件继续传播
     - ```:submit.prevent```提交事件不再重载页面，拦截默认事件
     - ```:click.stop.prevent```可以串联
     - ```:click.capture=""```事件捕获模式，内部元素触发的事件先在此处理，然后才交给内部元素。
     - ```:click.self=""```在当event.target是当前元素自身时才触发，即事件不是从内部元素触发的
    - ```:click.once```点击事件只会触发一次，可以用在防止重复提交上。
    - ```:scroll.passive```执行默认方法。浏览器只有等线程执行到事件监听器对应的代码时才会知道内部是否有调用preventDefault函数来阻止事件的默认行为，所以浏览器本身是无法对这种场景优化的。这种情况下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而导致卡顿。可以用来优化。加上passive就是为了告诉浏览器，事件没有用preventDefault，不用查询了，直接执行默认动作。因此passive和prevent也是冲突的。
- 按键修饰符，就是做输入框回车提交的那个！
```
<input :keyup.enter="submit">
```
这些可以在KeyboardEvent.key里找。
# 表单输入绑定
- **v-model**是语法糖，会根据控件类型自动选取正确方法来更新元素。在内部为不同的输入元素使用不同的property并抛出不同的事件。v-model的值可以放在data里。
```
<input v-model="message">
<p>{{message}}</p>
```
- 多个复选框可以绑定同一个v-model，单选框绑定同一个v-model会默认是一个单选框组。
- **value和v-model**不是一个东西
```
<input type="radio" v-model="picked" value="a">
```
当选中时，picked的值为a
- v-model的修饰符
    - ```v-model.lazy="msg"```在默认情况下，每次input触发都会把输入框的值和数据同步，加上lazy转为在change事件后才同步。可能是优化性能用吧，判断是否修改过。
    - ```v-model.number```自动把用户的输入值转为数值类型。
    - ```v-model.trim```过滤输入的首位空白字符
- 在组件上传入v-model会被当成props传入。
# 组件
- 一个组件的data必须是**函数**，因此每个实例可以维护一份被返回对象的独立的拷贝。如果写成对象形式，就会使所有组件实例都共用一份data！有时候是不是可以故意这样写？
- 子组件向父组件发送数据用emit，不用vuex搞那么麻烦。
- 在组件上用v-model这么麻烦，建议不要用
# 插槽
- 好多ui的源码用这个。在需要的地方放一个```<slot></slot>```
```
<naviLink url='/profile'>Your profile</naviLink>

<a :href='url'>
    <slot></slot>
</a>
```
组件渲染时，slot标签会被换成Your profile，这个Your profile可以是任何模板代码。
- 在插槽中使用数据时，访问data里面的数据时正常访问的，但不能访问这个调用插槽的组件的作用域，例如上面的例子，{{url}}会显示undefined，因为这个url是传递给这个组件的，而不是在组件内定义的。？
- 后备内容。在没提供内容的时候，插槽该渲染的东西。```<slot>Submit</slot>```不提供插槽内容时就渲染Submit
- 具名插槽。可以给slot提供一个name属性，在向具名插槽提供内容时，可以在一个template元素上使用v-slot指令，并以v-slot的参数形式提供其名称。
```
<slot name="header"></slot>

<template v-slot:header>
    <h1>Header Content</h1>
</template>
```
- 作用域插槽 slot-scope。可以解决上面的url显示undefined问题```<slot v-bind:url="url"></slot>```让url在父级的插槽内容中可用，作为一个插槽prop。
- 具名插槽也可以缩写，v-slot写成#
# 动态组件
- 用来做菜单栏切换，其实不用这个也可以，可以监听props然后用v-if渲染，但是比较笨。
- 把切换时要改变的地方写成组件，用is切换
```
<component v-bind:is="currentComponent"></component>
```
- currentComponent可以写成计算属性或者函数，返回一个字符串，就是要切换成的组件的名称。
- 有个问题是切换的时候不会保留之前的内容，即每次切换标签都创建了一个新的组件实例。
- 解决:用keep-alive把创建后的组件实例缓存下来。
```
<keep-alive>
    <component v-bind:is="currentComponent"></component>
</keep-alive>
```
- 异步组件。需要的时候才加载这部分组件。
- prop可以定义多个需要的类型
```
props:{
    propA:[String,Number]
}
```
- props是在组件实例创建之前验证的，如果有prop要用validator验证，不能引用this里的数据。
- .sync是对prop做双向绑定的，```<compo :title.sync="title"></compo>```，子组件里emit一个```(updete:title,newTitle)```
- 可以在App.vue里的Vue根组件定义data:{}数据，然后子组件里用```this.$root.foo```访问，类似全局数据，跟全局store差不多。
- ```this.$parent```可以访问父组件
- 通过ref访问子组件，比如提交验证不通过，在父组件操作聚焦到子组件的输入框上
```
    this.$refs.inputRefId.focus();
```
- ref和v-for一起用的时候，ref会是一个数组。
- **$refs只在组件渲染完成后生效，而且不是响应式的**
- 组件之间的循环引用，做目录树的时候可能会用，之前遇到了一个穿梭树的情况是不是也是用了这个？
# 强制更新
- 好几次想用这个，每次都没用，因为每次都是哪里写错了。注意数组、对象变化的检测。
```
this.$forceUpdate();
```
# 过渡&动画
- 在插入、移除DOM时设置过渡效果
- **transition**
```
<transition name="fade">
    <p v-if="show"></p>
</transition>

.fade-enter-active, .fade-leave-active{
    transition: opasity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
```
- 在节点进入/离开的过程中，有6个class切换
    - v-enter: 进入过渡的开始状态，在元素被插入之前生效。
    - v-enter-active: 过渡阶段状态，过渡完成之后移除，可以用来定义过渡的过程时间等。
    - v-enter-to: 进入过渡的结束状态，v-enter之后紧接着。
    - v-leave: 离开过渡的开始状态。
    - v-leave-active: 离开过渡生效时的状态，可定义离开过渡的过程时间。
    - v-leave-to: 离开过渡的结束状态。
- 如果没给transition定义name，则v是默认前缀。
- **css过渡**
```
<transition name="fade">
    <p v-if="show"></p>
</transition>

.fade-enter-active, .fade-leave-active{
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
    transform: translateX(10px);    // 平移
    opacity: 0;
}
```
- **css动画**
```
<transition name="fade">
    <p v-if="show"></p>
</transition>

.fade-enter-active{
    animation: bounce .5s;
}
.fade-leave-active{
    animation: bounce .5s reverse;
}
@keyframes bounce{
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.5);  // 放大倍数
    }
    100%{
        transform: scale(1);
    }
}
```
# 混入mixin
- 分发组件中的可复用功能。
```
// 定义一个minxin.js
const mixin={
    methods:{
        two(num){
            return num*num;
        }
    }
}
export default mixin

// 在main.js全局引入
import minxin from './mixin'
Vue.mixin(mixin)

// 在其他组件里可以直接使用
data(){
    return {
        squre:this.two(3)
    }
}
```
# 虚拟DOM
- vue建立一个虚拟DOM来知道要如何改变真实DOM
```
render: function(createElement){
    return createElement('h1',this.title);
}
```
- createElement, 接收参数可以是标签名、组件对象等
```
createElement('h1','头条');
```
- 