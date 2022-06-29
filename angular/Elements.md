# Angular元素
- Angular元素就是打包成自定义元素的Angular组件，自定义元素就是一套与具体框架无关的用于定义新HTML元素的web标准。
- 自定义元素允许定义一个由js代码创建和控制的标签，浏览器维护一个自定义元素的注册表CustomElementRegistry，它把一个可实例化的js类映射到html标签上（描述有点像vue的虚拟dom
## 工作原理
- 使用createCustomElement()函数把组件转换成一个可注册成浏览器中自定义元素的类，注册完这个配置好的类后就可以像使用内置HTML元素一样使用这个新元素了。
```html
<my-popup message="Use Angular!"></my-popup>
```
## 把组件转换为自定义元素
- 用Angular的createCustomElement()函数把组件转换为自定义元素，该函数会收集组件的Observable型属性。
- 转换过程实现NgElementConstructor接口，并创建了一个构造器类，用于生成组件的一个自举型（自己生成运行需要的实例？）实例。
- 使用customElements.define()函数把这个配置好的构造器和相关的自定义元素标签注册到浏览器的CustomElementRegistry中。
## 映射
- 自定义组件的属性和逻辑会直接映射到HTML属性和浏览器。
## 实现
- 自定义一个元素
```typescript
// popup.componnet.ts
@Component({
    selector: 'my-popup',
    template:`
        <span>{{message}}</span>
        <button (click)="closed.next()">关闭弹窗</button>
    `
})
export class PopupComponent {
    @HostBinding('@state')
    state: 'opened' | 'closed' = 'closed';
    @Input()
    get message(): string { reutrn this._message; }
    set message(message: string) {
        this._message = message;
        this.state = 'opened';  // 动画用的
    }
    private _message = '';
    // 关闭弹窗的事件发射器
    @Output()
    closed = new EventEmitter<void>();
}
```
- 创建一个可注入的服务，用两种方式来执行自定义元素PopupComponent的逻辑

```typescript
// popup.service.ts
import {ApplicationRef, ComponentFactoryResolver, Injectable} from "@angular/core";
import {PopupComponent} from "./popup.component";
import {NgElement, WithProperties} from "@angular/elements";

@Injectable()
export class PopupService {
    constructor(private injector: Injectable,
                private applicationRef: ApplicationRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    // 动态组件方式
    showAsComponent(message: string) {
        // 创建元素
        const popup = document.createElement('popup-component');
        // 创建组件
        const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
        const popupComponentRef = factory.create(this.injector, [], popup);
        // 把视图变化添加到变更检测中
        this.applicationRef.attachView(popupComponentRef.hostView);
        // 订阅关闭事件
        popupComponentRef.instance.closed.subscribe(() => {
            document.body.removeChild(popup);
            this.applicationRef.detachView(popupComponentRef.hostView);
        });
        popupComponentRef.instance.message = message;
    }

    showAsElement(message: string) {
        // 创建元素
        const popupEl: NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;
        // 监听关闭事件
        popupEl.addEventListener('closed', () => {
            document.body.removeChild(popupEl);
        });
        popupEl.message = message;
        document.body.appendChild(popupEl);
    }
}
```
- 把PopupComponent添加到模块的entryComponents列表，从编译过程中排除它，消除启动时的警告。

```typescript
// app.module.ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PopupService} from "./popup.service";
import {AppComponent} from "./app.component";
import {PopupComponent} from "./popup.component";

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule],
    prividers: [PopupService],
    declarations: [AppComponent, PopupComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
```
- 借助PopupService在运行时把这个组件添加到DOM，在应用运行期间，根组件的构造函数会把PopupComponent转换成自定义元素。
- 在根组件把这个自定义组件注册到浏览器。
```typescript
import {Injector} from "@angular/core";
import {PopupService} from "./popup.service";
import {createCustomElement} from "@angular/elements";
import {PopupComponent} from "./popup.component";

@Component({
    selector: 'app-root',
    template: `
        <input #input value="Message">
        <button (click)="popup.showAsComponent(input.value)">组件形式</button>
        <button (click)="popup.showAsElement(input.value)">元素形式</button>
    `,
})
export class AppComponent {
    constructor(injector: Injector, public popup: PopupService) {
        // 把组件转换为元素
        const popupElement = createCustomElement(PopupComponent, {injector});
        // 注册到浏览器
        customElements.define('popup-element', PopupElement);
    }
}
```
## 自定义元素类型
- 默认是泛化类型，比如HTMLElement，TypeScript无法判断返回元素的类型是否正确。
- 可以用**NgElement**和**WithProperties**类型

```typescript
import {NgElement, WithProperties} from "@angular/elements";

const aDialog = document.createElement('my-dialog') as NgElement & WithProperties<{ content: string }>;
aDialog.content = 'Hello';
aDialog.content = 123;  // 报错，类型不对
```
- 统一声明每个自定义元素的类型

```typescript
import {NgElement, WithProperties} from "@angular/elements";

declare global {
    interface HTMLElementTagNameMap {
        'my-dialog': NgElement & WithProperties<{ content: string }>;
        'my-other-element': NgElement & WithProperties<{foo: bar}>;
    }
}
```
