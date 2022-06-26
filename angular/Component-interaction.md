# 组件交互
- 子组件中有输入型属性，@Input装饰器。可以指定别名。
```typescript
export class HeroChildComponent {
    @Input() hero!: Hero;
    @Input('master') masterName = '';
}
```
- 父组件引用子组件，把自己的属性绑定到子组件的输入型属性上。
```angular2html
<app-hero-child
    *ngFor="let hero of heroes"
    [hero]="hero"
    [master]="master"
></app-hero-child>
```
- 通过setter截取输入属性值的变化。类似vue的computed计算属性和watch
- trim名字里的空格
```typescript
export class NameChildComponent {
    @Input()
    get name(): string { return this._name }
    set name(name: string) {
        this._name = (name && name.trim) || '<no name set>';
    }
    private _name = '';
}
```
- **ngOnChanges**()监听输入属性值的变化，需要监视多个输入属性时更合适
```typescript
export class versionChildComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges) {
        const log: string[] = [];
        for (const propName in changes) {
            const changedProp = changes[propName];
            const to = JSON.stringify(changedProp.currentValue);
            if(changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                const from = JSON.stringify(changedProp.previousValue);
                log.push(`${propName} changed from ${from} to ${to}`);
            }
        }
        this.changeLog.push(log.join(', '));
    }
}
```
- 父组件监听子组件的事件。
  - 子组件暴露一个**EventEmitter**属性，子组件用该属性emits事件，父组件绑定这个事件属性监听。
  - EventEmitter是一个输出属性，用@Output装饰器。
```typescript
// 子组件
export class VoterComponent {
    @Output() voted = new EventEmitter<boolean>();
    vote(agreed: boolean) {
        this.voted.emit(agreed);
    }
}
```
```typescript
// 父组件
@Component({
    selector: 'app-vote-taker',
    template: `
        <app-voter
            *ngFor = 'let voter of voters'
            (voted) = 'onVoted($event)'></app-voter>
    `
})
export class VoteTakerComponent {
    onVoted(agreed: boolean) {
        // ...
    }
}
```
- 父组件与子组件通过本地变量互动
  - 父组件不能直接使用子组件的属性或方法，但可以在父组件模板里创建一个子组件副本，利用这个副本来读取子组件的内容。
  - 把本地变量#timer放到子组件标签中，用来代表子组件。在父组件的模板中可以访问子组件的所有属性或方法。
```typescript
// 父组件
@Component({
    selector: 'app-countdown-parent-lv',
    template: `
        <button (click)="timer.start()">Start</button>
        <app-countdown-timer #timer></app-coundown-timer>
    `
})
```
- 本地变量方法中，所有连接都在父组件模板中进行，父组件本身对子组件没有访问权。在类代码里无法访问子组件。
- 因此需要@ViewChild()，把子组件作为ViewChild，注入父组件里。

```typescript
// 父组件
@Component({
    selector: 'app-countdown-parent-vc',
    template: `
        <button (click)="start()">Start</button>
        <app-countdown-timer></app-coundown-timer>
    `
})
export class CountdownViewChildParentComponent implements AfterViewInit {
    @ViewChild(CountdownTimerComponent)
    // 把子组件注入到私有属性里
    private timerComponent!: CountdownTimerComponent;
    seconds() { return 0; }
    // 用seconds()方法获取seconds属性
    ngAfterViewInit() {
        // 被注入的子组件只有在Angular显示了父组件视图后才能访问，所以先把seconds设为0
        // 显示父组件后调用ngAfterViewInit钩子，但这时直接更新seconds方法会报错。
        // Angular的单向数据流会阻止在同一个周期内更新父组件视图，应用在显示秒数之前会被迫再等一轮
        // 要用setTimeout再等一轮
        setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
    }
    start() { this.timerComponent.start(); }
    stop() { this.timerComponent.stop(); }
}
```
- 父子组件通过服务通讯
  - 父子组件共享一个服务，利用该服务在**组件家族**内部实现双向通讯。
  - 这个组件子树之外的组件无法访问该服务。
  - 下面这3端看官网比较好，主要就是1个服务分别有通知和确认两个功能，父组件发出通知并订阅服务中的确认，子组件发出确认并订阅服务中的通知。
  - 这样父子组件做动作后对方都能通过服务这个中转站收到，这种情况下除了视图上的包含也很难看出父子组件的父子关系。
```typescript
// mission.service.ts
// MissionService把1个父组件和多个子组件联系起来

@Injectable()
export class MissionService {
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  
  announceMission(mission: string) {
      this.missionConfirmedSource.next(mission);
  }
  confirmMission(astronaut: string) {
      this.missionConfirmedSource.next(astronaut);
  }
}
```

```typescript
// 父组件，提供服务实例，并通过providers将其共享给它的子组件
import {MissionService} from "./mission.service";

@Component({
  selector: 'app-mission-control',
  template: `
    <button (click)='announce()'>Announce Mision</button>
    <app-astronaut
        *ngFor='let astronaut of astronauts'
        [astronaut]='astronaut'>
    </app-astronaut>
  `,
  providers: [MissionService]
})
export class MissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  missions = ['Fly to the moon!',
    'Fly to mars!',
    'Fly to Vegas!'];

  constructor(private missionService: MissionService) {
      missionService.missionConfirmed$.subscribe(
          astronaut => {
              this.history.push(`${astronaut} confirmed the mission`);
          });
  }
  announce() {
      this.missionService.announceMission('mission');
  }
}
```

```typescript
// 子组件
import {MissionService} from "./mission.service";
import {Subscription} from "rxjs";

export class AstronautComponent implements OnDestroy {
  subscription: Subscription;
  mission = '<no mission announced>';
  // 通过构造函数将服务实例注入自身
  constructor(private missionService: MissionService) {
      // subscription变量，订阅服务的通知并响应
      this.subscription = missionService.missionAnnounced$.subscribe(
          mission => {
              this.mission = mission;
          }
      )
  }
  confirm() {
      this.missionService.confirmMessage(this.astronaut);
  }
}
```
