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

```
