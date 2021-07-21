nums=[2, 3, 1, 0, 2, 5, 3];
var findRepeatNumber = function(nums) {
    let map={};
    for(let i=0;i<nums.length;i++){
        if(map[nums[i]]==1){
            return nums[i];
        }
        map[nums[i]]=1;
    }
};