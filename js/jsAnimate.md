- 数组const bricks=[];
如果是二维数组，在外层循环要再加bricks[i]=[];
- html文件里记得加\<script src="script.js">\</script>
- canvas画布，在html里用\<canvas>标签，CSS里对canvas设置样式，js用DOM方法获取画布，canvas.getContext('2d')引用，2d是固定参数。
画一堆长方体：
    ```
    bricks.forEach(column=>{
        column.forEach(b=>{
            ctx.beginPath();
            ctx.rect(b.x,b.y,b.w,b.h);
            console.log(b.visible)
            ctx.fillStyle=b.visible?'#0095dd':'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
    ```
- 做一个滑动出现的侧边栏。
html照常写，
    ```
    <div id="rules">
        <h2>How to Play:</h2>
        <p>
            Use your right and left keys to move the paddle to bounce the ball up
            and break the blocks.
        </p>
        <button id="close-btn" class="btn">Close</button>
    </div>
    ```
    js里加上按钮的事件监听，用classList控制新增和移除样式，
    ```
    closeBtn.addEventListener('click',()=>rules.classList.remove('show'));
    rulesBtn.addEventListener('click',()=>rules.classList.add('show'))
    ```
    CSS有显现和隐藏两种。滑动可用transition和transform
    ```
    #rules{
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        color: white;
        width: 400px;
        padding: 10px;
        min-height: 100vh;
        line-height: 1.5;
        transform: translateX(-4000px);
        transition: transform 1s ease-in-out;
    }
    #rules.show{
        transform: translateX(0);
    }
    ```
    - min-height设置元素的最小高度，line-height设置行间距离。
- ctx.clearRect(0,0,canvas.width,canvas.height)在矩形范围内清除像素。不能忘
- js数组中设置一个变量控制该元素是否可见，渲染时根据它判断。
- 键盘监听
    ```
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);
    ```
    压下按键和抬起按键，keyDown为对应的函数。
    ```
    function keyDown(e){
        if(e.key==='ArrowRight'){
            paddle.dx=paddle.speed;
        }else if(e.key==='ArrowLeft'){
            paddle.dx=-paddle.speed;
        }
    }
    function keyUp(e){
        if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
            paddle.dx=0;
        }
    }
    ```
- 
    ```
    function update(){
        movePaddle();
        moveBall();
        draw();
        requestAnimationFrame(update);
    }
    ```
    requestAnimationFrame(update):执行动画，在下次重绘之前调用指定回调函数更新动画。
    