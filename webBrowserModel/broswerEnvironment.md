浏览器环境概述
---
- 浏览器内置JavaScript引擎，执行JavaScript脚本。
- 网页中嵌入JavaScript代码有四种方法。
    - script标签直接嵌入。
    - script标签加载外部脚本。
    - 事件属性。onclick等，可以直接写js代码
    - URL协议。
    - 前两种不能混用。
- script标签有一个**type**属性，用来指定脚本类型，text/javascript是默认值，老式浏览器用，application/javascript新浏览器用。如果type的值浏览器不认识，就不会执行代码。
- script有integrity属性，为了防止外部篡改脚本，指定一个脚本的签名，一旦有人篡改会导致签名不匹配，浏览器拒绝加载。
- URL支持javascript:协议，在url的位置写代码，使用这个url时就执行。
浏览器加载原理
---
- 1、浏览器一边下载一边解析html网页。
- 2、解析过程中，发现script标签，就暂停解析，把网页渲染的控制权交给JavaScript引擎。
- 3、如果script元素引用了外部资源，就下载该资源再执行，否则直接执行代码。
- 4、JavaScript引擎执行完毕，控制权交换渲染引擎，恢复往下解析html网页。
- 为什么加载外部脚本时要停止页面渲染？原因是JavaScript代码可以修改DOM，让它们同步执行会导致复杂的线程竞赛问题。
- 避免以上情况，就要把script标签放在页面底部，这样即使脚本失去响应页面主体也渲染完成了。这样也可以避免在DOM结构生成之前就调用DOM节点。
- 脚本执行顺序由它们在页面中出现顺序决定，但下载顺序是并行的。
- 解析和执行CSS也会阻塞。对于来自同一个域名的资源，浏览器有限制，同时最多下载6~20个资源，最多同时打开的tcp连接有限制，这是为了防止对服务器造成太大压力。所以一般把静态文件放在不同域名下，以加快下载速度。
- script标签的defer属性，可以解决脚本文件下载阻塞渲染的问题，作用是延迟脚本的执行，等DOM加载后再执行。
解析过程中发现带有defer属性的script标签，浏览器还是**继续往下解析**，并行下载外部脚本，完成解析html网页后，再回头执行已下载好的脚本。
对于内置而不是加载外部脚本的script标签，defer不起作用，用defer加载时不应该用document.write
```
<script src='a.js' defer></script>
```

- 解决阻塞的第二个方法，async属性。可以用另一个进程下载脚本，下载时不会阻塞渲染。和defer不同，浏览器下载脚本完成后就暂停解析html网页，开始执行脚本，而不是等网页解析完再执行。**无法保证脚本执行顺序**，哪个脚本先下载完哪个先执行。不要用document.write。优先用defer吧还是。
```
<script src='a.js' async></script>
```
- 脚本的动态加载。script元素动态生成后插入页面。感觉不太好，不知道有什么用。
- src的写法可以换协议，默认是http，前面加https://是https协议，//是根据页面本身的协议。
浏览器组成
---
- 浏览器核心：**渲染引擎**、**JavaScript引擎**
- 渲染引擎将网页代码渲染为用户看的文档。Chrome是blink引擎，Firefox是gecko引擎……等等
- **渲染引擎处理网页四个阶段**（不是按顺序的）
    - 1、解析代码，html代码解析为DOM，CSS代码解析为CSSOM（CSS Object Model）
    - 2、对象合成，把DOM和CSSOM合成一颗渲染树render tree
    - 3、布局：计算出渲染树的布局layout
    - 4、绘制：绘制渲染树到屏幕。
- 渲染树转为网页布局称为布局刘flow，布局显示到页面称为绘制paint，都具有阻塞效应。页面生成后，脚本操作和CSS操作，都会触发重流reflow和重绘repaint，用户的互动也触发。重流必然导致重绘，重绘不一定需要重流。
- 应尽量降低重绘的次数和成本，尽量不动高层的DOM元素，重绘table和flex布局开销都大。浏览器会累计DOM变动，一次性执行。
- tips
    - 读写DOM应尽量写一起，不要读一个操作一个。
    - 不要一个个改样式，用css class一次性改！
    - 用documentFragment操作DOM
    - 用window.requestAnimationFrame() ，可以把代码推迟到下一次重绘之前执行，而不是要求页面立即重绘。
    - 使用虚拟DOM库。？
```
function exa(element){
    var curr=element.clientHeight;
    window.requestAnimationFrame(function(){
        element.style.height=(curr*2)+'px';
    });
}
allElement.forEach(exa);
```