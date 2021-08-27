/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
// var copyRandomList = function(head, cachedNode = new Map()) {
//     if (head === null)  return null;
//     if (!cachedNode.has(head)) {
//         cachedNode.set(head, {val: head.val});
//         Object.assign(cachedNode.get(head),
//             {next: copyRandomList(head.next, cachedNode), random: copyRandomList(head.random, cachedNode)});
//     }
//     return cachedNode.get(head);
// }
var copyRandomList = function (head) {
    if (head === null)  return null;
    // 在所有节点后添加一个节点
    for (let node = head; node !== null; node = node.next.next) {
        let nodeNew = new Node(node.val, node.next, null);
        node.next = nodeNew;
    }
    // 处理random
    for (let node = head; node !== null; node = node.next.next) {
        let nodeNew = node.next;
        nodeNew.random = (node.random === null) ? null:node.random.next;
    }
    let headNew=head.next;
    // 拆成两个链表
    for (let node = head; node !== null; node = node.next) {
        let nodeNew = node.next;
        node.next = node.next.next;
        nodeNew.next = (nodeNew.next === null) ? null:nodeNew.next.next;
    }
    return headNew;
}
