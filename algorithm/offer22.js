/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function(head, k) {
    let p1=head,p2=head;
    for(let i=0;i<k;i++) {
        p2=p2.next;
    }
    while (p2) {
        p1=p1.next;
        p2=p2.next;
    }
    return p1;
};
