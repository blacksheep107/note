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