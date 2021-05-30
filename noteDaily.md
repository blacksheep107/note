#零散的东西
- document.getElementById('p');
- image.classList.add('finished'); 为元素增加一个finished的class
- image.style.display='none'; 把图片元素的样式设置为不显示
- select 下拉框选项
```
<select id="mySelect">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
```
e.target.value输出当前节点值，通过input事件监听。
- 设置编码，在head标签里
```
<meta charset="utf-8 />
```
- js冒泡：事件从DOM树层层往上传递，直到根节点。
当子元素事件触发，事件会沿着包含关系往上级传递，每一级都可以触发。
- 停止事件冒泡，加入event.stopPropagation();
- 弹窗提示 alert("hello");
- webpack报warning要设置mode时，在module.exports={}里面设置mode:'development'
然后就可以用import _ from 'lodash', 浏览器不再报错，require也是。
- 写了个while(1)想看看window.getSelection()效果的，然后浏览器卡住了。
- 用window.onload=function写啊，你笨啊
```
window.onload=function(){
    var a=document.getElementById('a');
    document.onmouseup=function(){
        console.log(window.getSelection().toString());
    }
}
```
搞了半天，得这么写啊。少了toString和window都不行。
- vscode控制台中文乱码，控制台输入 chcp 65001
- 为什么用flex不用margin：两行的多个元素，每行都要求不同间距，grid应该办不到。flex不用去调单个元素margin，可以设置width，然后justify-content: space-between
- 设置页面滚动：overflow: auto，不滚动：overflow: hidden
- 删掉一个结点内的所有子结点：直接把innerHTML="", 不用去循环判断它有没有孩子节点并不断删除第一个子结点了。
- box-shadow：设置阴影，x轴偏移量，y轴偏移量，阴影模糊半径，阴影扩展，阴影颜色，投影方式。可以设置多个，参数之间用空格分开，多个阴影之间用，分开
	- blur可选，只能取正值，值越大阴影边缘越模糊。
	- spread可选，正负皆可，代表阴影的周长向四周扩展的尺寸。
	- inset可选，将外部头应该改为内部投影。阴影在内容下，背景上。
	- 实现元素四周都加上阴影，可以设置多个阴影；或设置一个阴影xy轴都为0，设置blur实现，或设置spread让阴影变深/浅，即向外/内扩展。
	- 如果元素指定border-radius，阴影呈现相同的圆角。
	- 用spread实现双色方括号：红色：设置阴影向左上便宜30px，向内收缩25px，这样阴影就会变小，不会全部包裹起来。
	```
	.decorator {
		width: 300px;
		height: 100px;
		padding: 30px;
		box-shadow: -30px -30px 0 -25px red,30px 30px  0 -25px green; 
	}
	```
	- 用spread实现把一个100×100的元素放大到200×200，spread设为100
- 用伪元素设置200×200，可以画个√
```
    content: '';
    position: absolute;
    border-color: #009933;
    border-style: solid;
    border-width: 200px;
    /* height: 1em; */
    /* top: 1.3em; */
    /* left: 0.6em; */
    margin-top: -1em;
    /* transform: rotate(
45deg
); */
    width: 0.5em;
```
- 状态码304是协商缓存命中，使用缓存加载网页，302是重定向，404是资源不存在，
- transform属性。
	- scale(2,2) 把x轴y轴坐标放大2，元素两倍大小显示。元素宽和高没有变，也就是可能会覆盖周边的元素！
	- rotate(45deg) 顺时针旋转45度。
	- rotate和scale的顺序不能随意调换！
	- translate(100px,100px)往右，往下平移。translateZ离屏幕更近。
	- skew(10deg,10deg) 倾斜元素