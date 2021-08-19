/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head==null||head.next==null) return head;
    let p1=head,p2=head.next,p3=head.next.next;
    head.next=null;
    while (1) {
        p2.next=p1;
        p1=p2;
        p2=p3;
        if(p2==null)    break;
        p3=p3.next;
    }
    return p1;
};
