/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
    // let i=0,j=nums.length-1;
    // while (i<j){
    //     while(nums[i]%2!=0&&i<j)   i++;    // 偶数
    //     while(nums[j]%2==0&&i<j)   j--;    // 奇数
    //     console.log(nums[i],nums[j])
    //     if(nums[i]%2==0&&nums[j]%2!=0){
    //         let t=nums[j];
    //         nums[j]=nums[i];
    //         nums[i]=t;
    //     }
    //     i++;j--;
    // }
    let nums1=[],nums2=[];
    for(let i=0;i<nums.length;i++){
        if(nums[i]%2==0)    nums2.push(nums[i]);
        else nums1.push(nums[i]);
    }
    return nums1.concat(nums2);
};
console.log(exchange([2,4,6]))
