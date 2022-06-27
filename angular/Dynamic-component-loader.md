# 动态组件加载器
## 用指令来定义模板中的组件插入点。
- 指令中注入ViewContainerRef来获取对容器视图的访问权，这个容器就是动态加入的组件的宿主。
- selector的值adHost就是指令名称。
```typescript
import {ViewContainerRef} from "@angular/core";

@Directive({
    selector: '[adHost]',
})
export class AdDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
```
## 加载组件
- 把指令应用到ng-template，即组件要动态加载的地方。
```angular2html
<ng-template adHost></ng-template>
```
## 获取组件实例
```typescript
// 把viewContainerRef指向这个组件的现有实例
// adHost指令在它的构造函数中注入了一个ViewContainerRef，adHpst用来指定把动态组件插到什么位置，因此这个指令可以访问到这个宿主组件。
const viewContainerRef = this.adHost.viewContainerRef;
// clear()销毁本容器中的所有视图。
viewContainerRef.clear();
// 要把这个组件添加到模板中，可以用createComponent方法。
// 方法返回一个引用，指向这个刚加载的组件，这个引用就可以和组件进行交互。
const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
componentRef.instance.data = adItem.data;
```
- 引入指令文件，用@ViewChild获取adHost。
