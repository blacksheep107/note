/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
 head = [4,5,1,9], val = 5
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
function ListNode(val) {
    this.val=val;
    this.next=null;
}
 var deleteNode = function(head, val) {
    if(head.val==val) {
        return head.next;
    }
    let p=head.next,pre=head;
    while(p){
        if(p.val==val){
            pre.next=p.next;
            return head;
        }else{
            p=p.next;
            pre=pre.next;
        }
    }
};
console.log(deleteNode(head,val));