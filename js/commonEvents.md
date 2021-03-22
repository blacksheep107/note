常见事件
---
- beforeunload事件：在各种资源将要卸载前触发。可以防止用户不小心卸载资源。
```
window.addEventListener('beforeunload',function(e){
    e.returnValue='确定离开？';
});
```
用户关闭窗口会弹窗。
- unload事件在窗口关闭或document对象要卸载时触发，顺序在beforeunload后面，pagehide后面。unload发生时，文档处于一个特殊模式，所有资源仍然存在，但对用户来说都不可见。建议不用。
session事件
---
- 浏览器会在当前会话（session）缓存页面，前进/后退时是从缓存中加载。
- pageshow事件在页面加载时触发，包括第一次加载和从缓存中加载。第一次加载时，它的触发顺序在load后面，从缓存中加载时，load不会触发！缓存加载时，DOMContentLoaded事件也不触发。
- pageshow的persisted属性可以判断页面是否从缓存中加载。
- pagehide事件和pageshow类似，离开页面时触发，如果在window上定义unload，页面不会保存在缓存中。以上两个事件只在history对象变化时触发，和可见性无关。
- popstate事件在浏览器的history独享当前记录发生**显示**切换时触发，history.pushState()不行。
- hashchange事件。location.hash='aa',可以在url后面加#aa
网页状态事件
---
- DOMContentLoaded事件，网页下载并解析完成后触发，但外部资源可能还没下载完。比load事件早，要区分！
- **网页的JavaScript脚本是同步执行的**，可能推迟触发！
    ```
    document.addEventListener('DOMContentLoaded', function (event) {
        console.log('DOM 生成');
    });

    // 这段代码会推迟触发 DOMContentLoaded 事件
    for(var i = 0; i < 1000000000; i++) {
        // ...
    }
    ```
- readystatechange事件，当document和xmlhttprequest对象的readyState属性变化时触发，有三个可能值。loading正在加载，interactive网页已解析完成单外部资源还在加载，complete所有资源都结束加载，load事件即将触发。DOMContentLoaded的另一种实现方法。
窗口事件
---
- resize scroll 中途因为require在浏览器不支持去学了webpack
剪贴板事件
---
- cut将选中内容从文档中移除，加入剪贴板时触发。
- copy复制时触发。
- paste剪贴板内容粘贴后触发。
- 可以让input框不允许粘贴。以上都是ClipboardEvent的实例，有一个实例属性clipboardDate，是DataTransfer对象。
- 可以让用户复制的东西是开发者指定的内容。那csdn复制后面加的那些东西和一些网站不允许复制的东西也是这样做的？
焦点事件
---
- focus：元素节点获得焦点后触发，不冒泡。
- blur：失去焦点后触发。
- focusin：将要获得焦点时触发，在focus之前，会冒泡。
- focusout：将要失去焦点时触发，在blur之前，会冒泡。
- 都继承了FocusEvent接口，属性包含
target目标节点，relatedTarget相关节点。
- addEventListener的第三个参数没有理解，因为focus和blur事件不会冒泡，所以第三个参数要写true，只能在捕获阶段触发。
- 可以监听focus和blur事件，通过e.target.style.background='red'改变元素获取焦点和失去焦点的颜色。
CustomEvent接口
---
- 用于生成自定义事件实例，需要在触发事件的同时传入指定数据时用。
    ```
    var event=new CustomEvent('build',{'detail':'hello'});
    function eventHandler(e){
        console.log(e.detail);
    }
    document.body.addEventListener('build',function(e){
        console.log(e.detail);
    });
    document.body.dispatchEvent(event);
    ```
    自定义事件build，会输出detail属性的值。想到了vue？
GlobalEventHandlers接口
---
- 指定事件的回调函数可以用addEventListener，或者直接指定，**div.onclick=func**;这个接口是由GlobalEventHandlers提供的。
- onabort，abort事件发生时，一般用在img上。
- onerror，error分两种，一种是JavaScript运行时错误，会传到window对象，导致window.onerror，处理函数有五个参数，message错误信息字符，source报错脚本url，lineno报错行号，colno报错列号，error错误对象。一种是资源加载错误，只会传到对应元素的onerror。
- onload，onloadstart，onfocus，onblur，onscroll
- oncontextmenu，在页面上按下右键，触发菜单，如果执行后返回false，相当于禁止右键菜单。document和widow触发效果一样。
- onshow，菜单显示后触发。
- 其他事件属性，包括鼠标，键盘，焦点，表单，触摸，拖动，被拖动，接受被拖动元素的容器元素，dialog对话框
https://wangdoc.com/javascript/events/globaleventhandlers.html
