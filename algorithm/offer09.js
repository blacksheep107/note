var CQueue = function() {
    this.arr=[];
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.arr.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    let i=this.arr.shift();
    return i==undefined?-1:i;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */