# Angular Component

- 组件包含HTML模板、TypeScript类、CSS选择器、CSS样式，和其他框架类似。
- 用CLI在终端中创建组件，自动创建一个文件夹
```
    ng generate component component-name
```
## 组件生命周期
- **ngOnChanges**()：当Angular设置数据绑定的输入属性时响应。
  - 如果组件绑定了输入属性，则在ngOnInit()之前、所绑定的输入属性变化时会调用。
  - 如果没有输入属性，不会调用。
- **ngOnInit**()：第一次显示数据绑定和设置指令/组件的输入属性后，初始化指令/组件。
  - 在第一轮ngOnChanges()完成之后调用，只调用一次。即使没有调用ngOnChanges()也会调用。
  - 在构造函数外部进行复杂的初始化，获取初始数据。
- ngDoCheck()：紧跟在每次执行变更检测的ngOnChanges()和首次执行变更检测ngOnInit()后面调用。
- ngAfterContentInit()：在Angular把外部内容投影进组件视图或指令视图之后调用。
  - 第一次ngDoCheck()后调用且只调用一次。
- ngAfterContentChecked()：Angular检查完被投影到组件或指令中的内容之后调用。
  - ngAfterContentInit()和每次ngDoCheck()之后调用。
- **ngAfterViewInit**()：初始化完组件视图及其子视图或包含该指令的视图之后调用。
  - 第一次ngAfterContentChecked()之后调用且只调用一次。
- ngAfterViewChecked()：每次Angular做完组件视图和子视图或包含该指令的视图的变更检测之后调用。
  - ngAfterViewInit和每次ngAfterContentChecked之后调用。
- **ngOnDestroy**()：每当Angular销毁指令/组件之前调用。可防止内存泄漏。

- 如果要逆向数据流，需要触发一个新的变更检测周期来允许这种变更。
  - 父组件基于子组件中的每一次数据变更采取行动，父组件只能通过**@ViewChild装饰器来访问子组件**
- **内容投影transclusion**是从组建外部的HTML内容插入到组建模板上，有点类似vue的slot
- ```<ng-content></ng-content>```标签是外来内容的占位符。
```angular2html
<after-content>
  <app-child></app-child>
</after-content>
```
```html
    <div>projected content begins</div>
        <ng-content></ng-content>
    <div>projected content ends</div>
```
- AfterContent狗子和AfterView相似，区别在子组件类型的不同。
  - AfterView钩子关心的是ViewChildren，子组件情况。
  - AfterContent钩子关心的是ContentChildren，内容投影情况，通过@ContentChild装饰器查询子级内容。
  - AfterView钩子调用之前已经调用完所有的AfterContent钩子。在完成该组件视图的合成之前已经完成所有投影内容的合成工作。
  - AfterContent和AfterView之间有一个小的时间窗，允许修改宿主视图。（？）
- 监控ngOnChanges()无法捕获的变更，可以实现DoCheck()

## 视图包装
- 组件样式不影响其他部分。Component装饰器提供encapsulation选项，用来控制每个组件的视图封装。
  - ViewEncapsulation.ShadowDom，基于浏览器内置的Shadow DOM API将组件视图包含在ShadowRoot中，以隔离方式提供样式。
  - Emulated，（默认模式），Angular来修改组件的CSS选择器，使它们只应用于组件视图。（模拟Shadow DOM行为）
  - None，不用视图封装。
- Emulated和none的组件样式都是添加到文档的head标签中，在整个应用里都可用，emulated只影响到自己的组件模板中的元素。
- ShadowDom的组件样式仅添加到shadow DOM宿主中，只影响各自组件的元素。
- None的组件样式会影响shadow DOM中的匹配元素。