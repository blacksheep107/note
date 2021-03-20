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
- 在input，textarea里选中文本时触发。
