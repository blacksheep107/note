# 父子指令及组件之间传值
- **@Input**允许父组件更新子组件中的数据，**@Output**允许子组件向父组件发送数据。
- @Input，可以用ngOnChanges钩子监视@Input属性的变化
```typescript
// 子组件
export class ItemDetailComponent {
    @Input() item = '';
}
```
```angular2html
<!--父组件-->
<app-item-detail [item]="currentItem"></app-item-detail>
```
- @Output，子组件用@Outpu属性来引发事件以通知父组件，为了引发事件，@Output必须是EventEmitter类型。

```typescript
// 子组件
import {EventEmitter, Output} from "@angular/core";
export class ItemOutputComponent {
    // 创建一个新的事件发射器，它发出的数据是string类型的
    @Output() newItemEvent = new EventEmitter<string>();
    addNewItem(value: string) {
        this.newItemEvent.emit(value);
    }
}
```
- 子组件模板的输入框带有模板引用变量#newItem，模板中其他标签可以直接使用，点击按钮发射输入框的值
```angular2html
<!--子组件模板-->
<input type="text" id="item-input" #newItem>
<button (click)="addNewItem(newIten.value)">Add new item</button>
```
- 父组件模板引入子组件，把子组件中的发射事件连接到父组件的addItem方法。
```angular2html
<!--父组件模板-->
<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
```
- 可以在同一个子组件上使用@Input和@Output
