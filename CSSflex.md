CSS flex布局
---
- Flexible Box弹性布局，用来为盒装模型提供最大的灵活性。
- 容器指定为flex布局
    ```
    .box{
        display:flex;
    }
    ```
- 行内元素使用flex布局
    ```
    .box{
        display:inline-flex;
    }
    ```
- 采用flex布局的元素称为flex容器(container)，所有子元素为容器成员，称为flex项目(item)。
- flex-direction属性决定主轴的方向：row,row-reverse,column,column-reverse
- flex-wrap属性定义如果一条轴线排不下如何换行：nowrap（不换行）,wrap（换行，第一行在上方）,wrap-reverse（换行，第一行在下方）
- flex-flow是flex-direction和flex-wrap的简写
- justify-content属性定义项目在主轴上的对齐方式，flex-start,flex-end,center,space-between,space-around
- align-items属性定义项目在交叉轴上如何对齐，flex-start,flex-end,center,baseline,stretch
- aline-content属性定义多根轴线的对齐方式，flex-start,flex-end,center,space-between,space-around,stretch
- order属性定义项目的排列顺序，数值越小排列越靠前。
- flex-grow属性定义项目的放大比例。
- flex-shirnk属性定义项目的缩小比例。
- flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。
- align-self属性允许单个项目与其它项目不一样的对齐方式，覆盖align-items。
- 居于正中间：
    ```
    .box{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    ```
    http://www.ruanyifeng.com/blog/2015/07/flex-examples.html