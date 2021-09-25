var MaxQueue = function() {
    this.queue = [];
    this.maxQueue = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
    if (!this.maxQueue.length) return -1;
    return this.maxQueue[0]; // 大到小
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
    this.queue.push(value);
    while (this.maxQueue[this.maxQueue.length-1] <= value) this.maxQueue.pop();
    this.maxQueue.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
    if (!this.queue.length) return -1;
    let ans = this.queue.shift();
    if (ans === this.maxQueue[0])   this.maxQueue.shift();
    return ans;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */