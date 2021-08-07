- css animation需要指定动画一个周期持续的时间
e.g. 鼠标悬停在div元素上时会产生rainbow动画效果，持续时间1s
```
div:hover{
    animation: 1s rainbow;
}
@keyframes rainbow{
    0%  {background: #c00;}
    50% {background: orange;}
    100%    {background: yellow;}
}
```
- 默认只播放一次动画，加入infinite可以无限次播放，也可以指定次数
```
div:hover{
    animation: 1s rainbow infinite;
}
```
- 动画结束后会调回初始状态，**animation-fill-mode**属性让动画保持在结束状态。
```
div:hover{
    animation: 1s rainbow forwards;
}
```
    - none: 默认回到没开始的状态。
    - backwards: 让动画回到第一帧状态。
    - both: 根据animation-direction轮流使用forwards和backwards规则。
- **animation-direction**指定动画播放的方向，对应animation简写的第4个值。
    - normal: 默认从前往后
    - reverse: 相反
- 简写形式
```
div:hover {
    animation: 1s 1s rainbow linear 3 forwards normal;
}
div:hover {
    animation-name: rainbow;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 1s;
    animation-fill-mode:forwards;
    animation-direction: normal;
    animation-iteration-count: 3;
}

```
- keyframes用来定义动画各个状态。0%可以用from，100%可以用to
- **animation-play-state**鼠标移走后的动画状态。
```
div{
    animatino: spin 1s linear infinite;
    animation-play-state: paused;
}
div:hover{
    animation-play-state: running;
}
```
鼠标移走，动画状态暂停；鼠标悬停，动画继续播放。