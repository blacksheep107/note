/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let i = 0,
    j = height.length-1,
    ans = 0;
    while(i<j) {
        if(height[i] < height[j]) {
            ans = Math.max(ans, (j-i)*Math.min(height[i], height[j]));
            i++;
        }else{
            ans = Math.max(ans, (j-i)*Math.min(height[i], height[j]));
            j--;
        }
    }
    return ans;
};