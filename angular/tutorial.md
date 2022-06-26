# Angular
- 是一个基于TypeScript构建的开发平台。
- Angular**组件**包含三部分：
    - @Component()装饰的TypeScript类
        - 指定一个CSS选择器，用于定义如何在模板中使用组件
        - HTML模板，指明如何渲染该组件
        - 一组可选的CSS样式
    - HTML模板
    - 样式文件
```angular
import { Component } from '@angular/core';
@Component({
    selector: 'hello-world',
    template: `
        <h2>Hello World</h2>
        <p>my component</p>
    `
})
export class HelloWorldComponent {
    
}
```
- 使用组件时
```
    <hello-world></hello-world>
```

# CLI创建项目
- 创建
```angular2html
    ng new angular-test
```
- 启动应用，--open是打开网页
```angular2html
ng serve --open
```
- src/app目录下可以看到AppComponent外壳的三个实现文件
  - app.component.ts是组件的类代码
  - app.component.html是组件的模板
  - app.component.css是样式
- src目录下的styles样式文件是全局样式
- 创建新组件
```angular2html
ng generate component heroes
```
- @Component是装饰器函数，用于为该组件指定元数据，CLI自动生成三个元数据属性
  - selector，组件的选择器
  - templateUrl，模板文件位置
  - styleUrls，CSS样式文件位置
- ngOnInit()是一个生命周期钩子，在创建完组件后调用，因此是放置初始化逻辑用的
# 语法
- 管道操作符 | ，是格式化数据的方法
```angular2html
{{hero.name | uppercase}}
```
- 双向绑定
```angular2html
<input id="name" [(ngModel)]="hero.name">
```
要在app.module.ts里引入FormsModule才可用
- 关键性的元数据位于@NgModule装饰器中，最重要的@NgModule位于顶层类AppModule上。FormsModule也是在这里的imports数组中引入的。
- 每个组件都必须声明在NgModule中，用CLI生成会自动加入AppModule
- 循环
```angular2html
<li *ngFor="let hero of heroes">
```
- *ngIf 条件绑定
```angular2html
<div *ngIf="selectedHero"></div>
```
- 类绑定，可以有条件地添加和删除CSS类
```angular2html
<li [class.selected]="hero === selectedHero"></li>
```
- 外部的组件要绑定到当前组件属性时，这个属性必须是一个带有@Input()装饰器的输入属性

```typescript
import {Component, OnInit, Input} from '@angular/core';
import {Hero} from "./hero";

export class HeroDetailComponent implements OnInit {
    @Input() hero?: Hero
}
```
在父组件给这个@Input装饰的属性传值时类似vue的props传值，是单向绑定
```angular2html
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
```

# 模拟数据
- 在src/app下创建mock-heroes.ts，export const一个常量存要模拟的数据
- 在要请求数据的组件里，导入模拟数据

# 服务
- 数据访问的任务放在服务上，将服务注入组件的构造函数中。
- 创建服务，在src/app下的hero.service.ts生成HeroService类的骨架
```
    ng generate service hero
```
- 在hero.service.ts里，有@Injectable()装饰器，它把这个类标记为依赖注入系统的参与者，会提供一个可注入的服务，它会接受该服务的元数据对象（和@Component()一样）
- 在服务里获取数据，即接口都写在这里，然后用一个方法暴露出去
- 必须先注册一个服务提供者，让新的服务可用，Angular才能把它注入到组件中。服务提供者就是某种可用来创建或交付一个服务的工具，实例化HeroService类来提供服务。
- 要用**注入器**注册服务，默认在CLI创建服务时会给@Injectable()装饰器添加providedIn:'root'，用**根注入器**将服务注册为提供者。
- 在顶层提供该服务时，Angular会为HeroService创建一个单一的、共享的实例，并把它注入到任何需要它的类上。
- **在服务里获取数据，在组件里引入服务**
- 组件里，一般在ngOnInit()里调用获取数据的方法，而不是构造函数，构造函数应尽量简单。
# Observable
- 可观察的数据
- 直接从mock里获取数据是同步的，从服务器是异步的，不能直接返回一个数据，应该返回Observable类
- rxjs的of()，可以传入一个数组，返回一个Observable数组
- HttpClient.get<Hero[]>()返回的也是Observable<Hero[]>
- 在组件中用subsceibe+回调函数接收数据，和vue中用then相似
# 路由
- 路由模块是AppRoutingModule，在src/app下的app-routing-module.ts
```angular2html
ng generate module app-routing --flat --module=app
```
flat把这个文件放入src/app中而不是单独的目录，--module=app把它注册到AppModule的imports数组中
- 在app-routing.module.ts里配置routes数组，每个对象包含path和component
- 在组件模板里面，用router-outlet标签（路由出口），改变浏览器地址就能对应到路由的组件
- 路由链接routerLink，点击跳转
```angular2html
<nav>
    <a routerLink="/heroes">Heroes</a>
</nav>
```
- 带参数的路由，id是参数
```typescript
{ path: 'detail/:id', component: HeroDetailComponent}
```
- 获取路由参数
```typescript
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
) { }
```
```typescript
this.route.snapshot.paramMap.get('id')
```
- 后退
```typescript
this.location.back();
```
# HttpClient
- 内存Web API，可以模拟远程数据服务器通讯
```
    npm install angular-in-memory-web-api --save
```
