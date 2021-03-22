input事件
---
- 当input，select，textarea标签的值变化时触发。
-
    ``` 
    mySelect.addEventListener('input',function(e){
        console.log(e.target.value);
    })
    ```
select事件
--- 
- 在input，textarea里**选中**文本时触发。变蓝的那种选中
    ```
    // HTML 代码如下
    // <input id="test" type="text" value="Select me!" />

    var elem = document.getElementById('test');
    elem.addEventListener('select', function (e) {
    console.log(e.type); // "select"
    }, false);
    ```
change事件
---
- 当input，textarea，select发生变化时触发，与input事件不同，它不会连续触发，input事件必然伴随change事件。
- 对于select，input和change基本等价。
invalid事件
---
- 提交表单的元素值不满足校验条件时触发。
```
<input type="text" required oninvalid="console.log('invalid input')" />
```
required属性指定在提交表单之前必须输入字段。
reset事件，submit事件
---
发生在表单对象form上，当所有表单变回默认值时触发reset，当表单提交时触发。
InputEvent接口
---
- 用e.data获取输入值
- js数组可以直接=赋值
- 