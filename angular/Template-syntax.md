# 模板语法
- Angular会忽略script元素，避免脚本注入攻击。
## 文本插值
- 把动态字符串合并到HTML模板中。用双花括号{{}}
- 可以用模板引用变量作为插值
```html
<input #customerInput>{{customerInput.value}}
```
## 模板语句
- 语句上下文通常是组件实例，也可以用模板上下文的属性。
- 可以将自己的$event对象作为参数，模板引用变量等等。模板上下文的名称优先于组件上下文的名称。
- 模板语句无法引用全局名称空间中的内容，如window或ducoment，不能调用console.log或Math.max
```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)">...</form>
```
- 类选择
```html
<div [ngClass]="{'special': isSpecial}"></div>
```
- 指令，clicked绑定实例里的一个属性，事件发射出去改变这个值
- clicked = $event，这个应该是绑到emit出来的值上面了。
```html
<div (myClick)="clicked=$event" clickable>click me</div>
{{clicked}}
```
```typescript
// click.directive.ts
import {ElementRef} from "@angular/core";

@Directive({selector: '[myClick]'})
export class ClickDirective {
    @Output('my-click') clicks = new EventEmitter<string>();
    toggle = false;

    constructor(el: ElementRef) {
        el.nativeElement.addEventListener('click', (event: Event) => {
            this.toggle = !this.toggle;
            // 点击时发射click!
            this.clicks.emit(this.toggle ? 'click!': '');
        })
    }
}
```
- 双向绑定
```html
<input [(ngModel)]="name">
```
- 动态绑定
```html
<div [class.special]="isSpecial">Special</div>
<button [style.color]="isSpecial ? 'red': 'green'">button</button>
<div [ngClass]="classes">classes是属性，值是类名</div>
<tr><td [attr.colspan]="1+1">两列合并</td></tr>
```
- 动态样式绑定，直接给class赋几个类名
```html
<div [class]="badCurly">Bad Curly</div>
```
```typescript
export class AppComponent {
    badCurly = 'bad curly';
}
```
```css
.bad {color: red;}
.curly {font-family: "Brush Script MT", cursive}
```
- 动态样式绑定，元素是否绑定某个类，isSpecial为true则该元素有special这个类，相当于```<div class="special"></div>````
```html
<div [class.special]="isSpecial"></div>
```
- 动态样式绑定，绑定固定值
```html
<div [style.font-size.em]="isSpecial ? 3:1">Big</div>
```
- 双向绑定
```html
<!--app.component.html 父元素-->
<!--双向绑定size和fontSizePx，size的变化会输出到fontSizePx？-->
<app-sizer [(size)]="fontSizePx"></app-sizer>
<div [style.font-size.px]="fontSizePx">跟随字号设定变化</div>
<label>Font size: <input [(ngModel)]="fontSizePx"></label>

<!--双向绑定另一种写法，size只写成输入属性，显示写出sizeChange的输出-->
<app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer>
```
```typescript
export class AppCompoent {
    fontSizePx = 16;
}
```
```typescript
export class SizerComponent {
    // 字号作为输入属性
    @Input() size!: number | string;
    @Output sizeChang = new EventEmitter<number>();
    resize(delta: number) {
        this.size = this.size + delta;
        this.sizeChang.emit(this.size);
    }
}
```
- 输入的双向绑定
```html
<!--直接改属性值-->
<input [value]="currentHero.name"
        (input)="updateCurrentHeroName($event)">
<!--[()]双向绑定-->
<input [(ngModel)]="currentHero.name">
<!--出现变化的代码逻辑单独绑定，$event是变化的值-->
<input [ngModel]="currentHero.name"
        (ngModelChange)="currentHero.name=$event">
<input [ngModel]="currentHero.name"
        (ngModelChange)="setUppercaseName($event)">
```

