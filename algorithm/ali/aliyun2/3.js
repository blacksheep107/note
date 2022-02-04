class EventEmitter {
    /* 功能实现 */
    events = []
    on(event, cb) {
        for(let i = 0; i<this.events.length; i++) {
            if(this.events[i].name === event) {
                this.events[i].cbs.push(cb);
                return;
            }
        }
        this.events.push({
            name: event,
            cbs: [cb]
        })
    }
    emit(...eventarr) {
        eventarr.forEach(event => {
            for(let i = 0; i<this.events.length; i++) {
                if(this.events[i].name === event) {
                    this.events[i].cbs.forEach(e => {
                        e();
                    })
                }
            }
        })
    }
}
const event = new EventEmitter();
    event.on('someEvent', (...args) => {
     console.log('some_event triggered', ...args);
});
event.emit('someEvent', 'someEvent', '123');
