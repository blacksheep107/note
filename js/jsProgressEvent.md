- 资源可能在脚本运行之前就加载完成，这样load和error的监听函数就不会执行，所以要用complete方法判断是否加载完成。
- image.complete
- DOM不提供家在错误的属性，所以error事件的监听函数最好放在元素的html代码中。
    ```
    <img src="" onerror="this.style.display='none'">
    ```
- **进度事件**用来描述资源加载的进度 ProgressEvent接口。
    - abort：外部资源中止加载。
    - error：错误导致无法加载。不冒泡。
    - load：外部资源加载成功。
    - loadstart：开始加载。
    - loadend：停止加载，排在以上事件后。
    - progress：加载过程中不断触发。
    - timeout：超时。
- loadend事件的监听函数可以取代abort，load，error的监听，因为它在之后发生，但加载是否成功未知。
- ProgressEvent(type,options)构造。lengthComputable表示加载的总量是否可以计算，loaded表示已加载的量，total需要加载的总量。
    - lengthComputable:true