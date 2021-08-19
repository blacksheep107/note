/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    var head=new ListNode();
    var p=head;
    while (l1!==null&&l2!==null) {
        if(l2===null||l1!==null&&l1.val<l2.val) {
            p.next=new ListNode(l1.val);
            l1=l1.next;
        }else{
            p.next=new ListNode(l2.val);
            l2=l2.next;
        }
        p=p.next;
    }
    if (l1!==null)   p.next=l1;
    if (l2!==null)   p.next=l2;
    return head.next;
};
