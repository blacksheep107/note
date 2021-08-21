/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.arr=[];
    this.minnum=[]; // 降序
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.arr.push(x);
    if (this.minnum.length==0)  this.minnum.push(x);
    else if (this.minnum[this.minnum.length-1]>=x) this.minnum.push(x);    // 更小
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.minnum[this.minnum.length-1]==this.arr[this.arr.length-1]) this.minnum.splice(this.minnum.length-1,1);
    this.arr.splice(this.arr.length-1,1);
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.arr[this.arr.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.minnum[this.minnum.length-1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
