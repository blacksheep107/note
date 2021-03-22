DOM video对象 实现在浏览器播放视频
---
- video对象的属性、方法和事件：https://www.runoob.com/tags/ref-av-dom.html
- +可能是数值运算符？作用是把任何值转为数值
    ```
    function setVideoProgress() {
        video.currentTime = (+progress.value * video.duration) / 100;
    }
    ```
- link标签
    ```
        <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" href="css/progress.css" />
    ```
    rel属性指被链接的文档是一个样式表，href规定被链接文档的位置
- click：点击屏幕切换播放状态；
video事件：
    - pause：当音视频已暂停时触发；
    - play：当音视频开始播放时触发；
    - timeupdate：当目前播放位置更改时触发；
- input标签支持所有HTML事件属性，input实现滑动条效果
    - change事件：当用户更改input select textarea元素的值并提交这个更改时，change事件在这些元素上触发。
    - 
    ```
        <input
            type="range"
            id="progress"
            class="progress"
            min="0"
            max="100"
            step="0.1"
            value="0"
        />
      ```
      type="range"实现滑动条，value为初值，min和max指定范围，step规定输入数字的间隔。
- 滑动条样式：https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
    - 直接照这个抄吧，没必要自己写
    - -webkit-appearance: none; 去除浏览器默认样式
    - width: 100%; 子元素的宽度等于父元素的宽度，会强制将元素变成和父元素一样的宽度，并且添加额外的空间在这个元素的width上，容易溢出，需要加上box-sizing:border-box。子元素设置宽度的百分比是指子元素内容区域相对于父元素内容区域，设置border-box后，子元素设置宽度的百分比是指**子元素整个盒子区域**相对于父元素内容区域。
    - background:transparent; 元素没有背景色；元素的事件会对被它遮住的元素所截获。
    - outline:none; 设置边框样式
    - box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;把一个或多个下拉阴影添加到框上，该属性是一个用逗号分割阴影的列表，每个列表由2-4个长度值，一个可选颜色值和一个可选的inset关键字决定。
    box-shadow:h-shadow v-shadow blur spread color inset;

        |  值   | 说明  |
        |  ----  | ----  |
        | h-shadow  | 必需。水平阴影的位置 |
        | v-shadow  | 必需。垂直阴影的位置 |
        | blur  | 模糊距离 |
        | spread  | 阴影大小 |
        | color| 阴影颜色|
        | inset| 从外层阴影改变阴影内侧|
- CSS import方法导入层叠样式表
    ```
    @import url('https://fonts.googleapis.com/css?family=Questrial&display=swap');
    ```
    必须放在代码最前面，否则不起作用，可以用link替代。
- max-height设置段落的最大高度。
- 样式后加!important提升指定该样式的使用优先权。
- border-top-left-radius给左上角添加圆弧边框。
- border:0;border:none;都是无边框，后者不渲染不占内存。
- font-weight:bold; 设置字体粗细。
- focus选择器。 
    ```
    .btn:focus{outline:0}
    ```
    获得焦点的按钮，设置其样式。
- @media查询。
    ```
    @media (max-width: 800px) {
        .screen,
        .controls {
            width: 90%;
        }
    }
    ```
    ↑使用@media查询来制作响应式设计。让屏幕和进度条宽度比都在90%（和html中的class对应）
    ```
    @media screen and (max-width: 300px) {
        body {
            background-color:lightblue;
        }
    }
    ```
    ↑如果文档宽度小于300像素则修改背景色。