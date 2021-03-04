- addEventListener 的三个参数：第一个参数表示事件名称，第二个参数表示接收事件处理的函数，第三个参数为useCapture，为true或false，true的触发顺序总在false之前，如果有多个true，则外层的触发先于内层，如果有多个false，则内层的触发先于外层。
- 彻底取消一个事件的传播
	```
	p.addEventListener('click', function (event) {
		event.stopImmediatePropagation();
	});
	```
	后面所有click的监听函数都不再被触发。
