- all：给元素执行所有transition效果的属性，元素共享同样的延续时间以及速率变换方式。 .5s是0.5s
```
.prison-score{
    transform: translateX(-50%);
    // 控制向上滚动
}
.animatedTop{
    transition: all .5s;
    margin-top: -36px;
}
```
- transition的作用在于指定状态变化所需要的的**时间**。
- 鼠标悬浮让图片放大：这样是瞬间放大的。
```
.img{
    height:10px;
    width:19px;
}
.img:hover{
    height:20px;
    width:20px;
}
```
- 加上transition指定过程，设置放大过程的时间
```
img{
    transition: 1s;
}
```
- 可以指定transition适用属性，比如只适用height，适用所有就是all，也可以指定多个属性，用,分开
```
img{
    transition: 1s height, 2s width;
}
```
- 可以设置两个属性变化的先后顺序。为width指定一个**delay**参数。
```
img{
    transition: 1s height, 1s 1s width;
}
```
- 