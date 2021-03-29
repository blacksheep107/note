window对象
---
- window对象指当前浏览器窗口，也是当前页面的顶层对象。未声明的对象就是顶层对象，所以无法检测出未声明对象。
- window.name表示当前浏览器窗口的名字，可写。
- window.closed窗口是否关闭，window.opener打开当前窗口的父窗口，直接在地址栏输入打开，把它设为null两个窗口就没办法联系了，a元素添加rel="noopener"属性，防止新打开的窗口获取父窗口，增加安全性。
- self和window属性都指向窗口本身，frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素，window.frames[0]表示页面中第一个框架窗口，如果iframe设置了id或name属性，就可以用属性值引用这个iframe窗口，frames就是window对象的别名。
- window.devicePixelRatio属性返回数值，表示一个CSS像素的大小和一个物理像素的大小之间的比率。即一个CSS像素由多少物理像素组成。
位置大小属性
---
- window.screenX Y返回浏览器窗口左上角相对于当前屏幕左上角距离。
- innerHeight，网页在当前窗口中可见部分的高宽度，放大缩小网页时改变。outerHeight，返回浏览器窗口的高度和宽度，包括浏览器菜单和边框。
- scrollX返回页面的水平滚动距离，单位为像素。别名pageXOffset
组件属性
---
- 组件属性返回浏览器的组件对象。
- locationbar地址栏对象，menubar菜单栏，scrollbars滚动条，toolbar工具栏，statusbar状态栏，personalbar用户安装的个人工具栏。visible表示这些组件是否可
见。
全局对象属性
---
- 指向一些浏览器原生的全局对象。
- document，location用于获取当前窗口的url信息，navigator用于获取环境信息，history表示浏览器浏览历史，localStorage指向本地存储，sessionStorage指向本地存储，console用于操作控制台，screen表示屏幕信息。
- isSecureContext表示当前窗口是否处在加密环境。如果是https协议就是true
window对象的方法
---
- 都是弹出对话框
- alert只有一个确定按钮，点击确定才会消失。可用\n换行
- prompt提示文字的下方还有一个输入框，要求用户输入信息，有确定和取消按钮。用户填入的值通过result获得```var result=window.prompt('年龄？',25)```
- confirm除了提示信息只有确定和取消，result返回true和false
- 都具有堵塞效应，弹出对话框后整个页面暂停执行。
- open方法用于新建另一个浏览器窗口，希望每个网站都这么干！不喜欢按回退！YouTube听到了吗
    - 可以接受参数，第二个参数是新窗口名字，如果撞名字就占用窗口，第三个参数windowFeatures表示新窗口的参数，下面的表示新窗口高度宽度都为200，没地址栏，有状态栏和滚动条，允许用户调整大小。open方法返回新窗口的引用，如果不同源就不能获取它的内部属性。打开失败返回null
    ```
    var popup=window.open(
        'https://www.baidu.com',
        'windowName',
        'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
    )
    ```
    
- close关闭窗口，stop停止窗口的加载。
- scrollTo将文档滚动到指定位置，接受滚动后位于窗口左上角的页面坐标，也可以接受一个配置对象options（包含滚动后页面左上角的坐标和滚动方式）scroll同样。scrollBy用于将网页滚动指定距离。```window.scrollBy(0,window.innerHeight)```将网页向下滚动一屏。也可以单独滚动某个元素Element.scrollTop Left IntoView
- print方法会跳出打印对话框。
- focus激活窗口，使其获得焦点，出现在其他窗口前面。blur移除焦点。当窗口激活时，触发focus事件，失去焦点激活blur
- getSelection返回一个Selection对象，表示用户现在选中的文本。可以toString获得文本。
```
window.onload=function(){
    var a=document.getElementById('a');
    document.onmouseup=function(){
        console.log(window.getSelection().toString());
    }
}
```
- getComputedStyle接受一个元素节点，返回一个包含该元素最终样式信息的对象。matchMedia用来检查CSS的mediaQuery语句。
- requestAnimationFrame方法跟setTimeout类似，都是推迟某个函数执行。推迟到浏览器下一次重流reflow时执行，通常16ms一次。如果要改变网页布局，这样可以节省资源，使网页效果更平滑，各个设备速度不同。返回一个整数，这个整数可以传入cancelAnimationFrame，用来取消回调函数的执行。
持续时间两秒，让元素持续向右移动的动画。
```
var element=document.getElementById('a');
element.style.position='absolute';
var start=null;
function step(timestamp){
    if(!start)  start=timestamp;
    var progress=timestamp-start;
    element.style.left=Math.min(progress/10,200)+'px';
    if(progress<2000){
        window.requestAnimationFrame(step);
    }
}
window.requestAnimationFrame(step);
```
- requestIdleCallback(callback,[options])，保证将回调函数推迟到系统资源空闲时执行。用于不是很紧急的任务。系统给callback传入一个IdleDeadline对象作为参数，有一个didTimeout属性（是否超时）和一个timeRemaining方法（返回空闲时段剩余毫秒数）。options只有timeout一个属性，用来指定回调函数推迟执行的最大毫秒数。
事件
---
- load发生在文档和窗口加载完毕时，onload指定这个事件的回调函数。
- error和onerror，脚本发生错误时触发。接受五个参数。一般只有JavaScript脚本错误才会触发。如果脚本网址和网页网址不在同一个域，不会提供详细出错信息，只返回错误类型"Script error."解决方法是在脚本所在服务器设置Access-Control-Allow-Origin的HTTP头信息，然后再网页的script标签中设置crossorigin="anoymous"，表示读取文件不需要身份信息。如果设为"use-credentials"表示浏览器会上传cookie和HTTP认证信息。
    - 出错信息
    - 出错脚本的网址
    - 行号
    - 列号
    - 错误对象
多窗口操作
---
- 网页中可以使用iframe元素，一个网页中可能嵌入多个窗口。
- 各窗口中的脚本可以引用其他窗口。top顶层窗口，parent父窗口，self自身。
- iframe嵌入的窗口，document.getElementById方法可以拿到该窗口的DOM节点，然后用contentWindow属性获得iframe节点包含的window对象，然后可以读子窗口内部的属性。
- 只有父子窗口在一个域时才能用脚本通信，否则只能用window.postMessage方法。
- frameElement属性返回iframe在父窗口中的DOM节点。
- frames属性返回一个类似数组的对象，每个成员的值是框架内的window对象，要获取DOM节点要加一个.document。
- 如果iframe设置了name或if属性，属性值会自动成为全局变量，并可以通过window.frames引用，返回子窗口。