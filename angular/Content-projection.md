# 内容投影
## 单插槽内容投影
- 在组件模板中添加<ng-content>元素，作为投影内容的占位。
```angular2html
<!--子组件-->
<ng-content></ng-content>
```
- 在父组件中调用子组件，并把自己的内容投影到子组件中。
```angular2html
<app-child>
    <p>this is a projection</p>
</app-child>
```
- ng-content元素是一个占位符，不会创建真正的DOM元素。
## 多插槽内容投影
- 一个组件可以有多个插槽，每个插槽可以指定一个CSS选择器，由选择器决定将哪些内容放入插槽。
```angular2html
<!--用select属性对应到投影内容-->
<ng-content></ng-content>
<ng-content select="[question]"></ng-content>
```
```angular2html
<!--父组件-->
<app-child>
    <p question>
        这个对应到question属性的投影
    </p>
    <p>
        这个对应到没有属性的投影
    </p>
</app-child>
```
- 如果ng-content元素不带select，则该实例将接收所有与其他ng-content元素都不匹配的投影组件
## 有条件的内容投影
- 在显示渲染np-template元素之前，Angular不会初始化该元素的内容。
- 在接收投影的组件中用ng-container元素占位。
- 把ng-container元素包装在另一个元素中，然后应用条件逻辑。
- 用ngTemplateOutlet指令来渲染既定的ng-template元素。
```angular2html
<!--接受投影的组件中（子组件）-->
<div *ngIf="expanded" [id]="contentId">
    <ng-container [ngTemplateOutlet]="content.templateRef"></ng-container>
</div>
```
- 在投影内容的模板中，用ng-template元素定义一个投影内容块，组件可以使用@**ContentChild**或者@ContentChildren装饰器获得对此模板内容的引用，即TemplateRef
- 在ng-template中创建了一个**自定义指令appExampleZippyContent作为API**，已将ng-template标记为组件内容。
- 借助这个内嵌模板(TemplateRef)，组件可以用**ngTemplateOutlet**指令来渲染所引用的内容。
```angular2html
<ng-template appExampleZippyContent>
    投影内容
</ng-template>
```
- 创建一个属性型指令，并在这个指令里注入TemplateRef实例。
- 这个指令提供了当Angular遇到自定义属性时要怎么做，这里是要实例化这个模板引用(TemplateRef)
```typescript
@Directive({
    selector: '[appExampleZippyContent]'
})
export class ZippyContentDirective {
    constructor(public templateRef: TemplateRef<unknown>) { }
}
```
- 在要将内容投影到的组件中，用@ContentChild获取投影内容的模板

```typescript
@ContentChild(ZippyContentDirective) content!: ZippyContentDirective;
```
- 如果是多插槽条件投影，可以用@ContentChildren获取投影元素的查询列表。
- 整个过程有很多不熟悉的东西，比如自定义指令和内置指令。
- 在父组件模板里引用子组件，并在子组件标签内创建**ng-template**标签作为投影内容，ng-template标签内带一个自定义指令。
- 在子组件里写条件逻辑，让条件逻辑包裹住**ng-container**标签，ng-container标签就是ng-template标签内容的占位符。
- ng-container标签带一个```[ngTemplateOutlet]="content.templateRef"```，用来获取模板内容。
- 这个模板内容是在子组件（将要投影到的那个组件）里用@ContentChild装饰器获取到的。
## 多种条件组合标识的内容投影
- 父组件用ngProjectAs属性设置标签别名，子组件中设置select选择属性，子组件将投影父组件中对应的组件内容。
```angular2html
<!--父组件-->
<app-child>
    <ng-container ngProjectAs="[question]">
        <p>投影内容</p>
    </ng-container>
</app-child>
```
```angular2html
<!--子组件-->
<ng-content select="[question]"></ng-content>
```
