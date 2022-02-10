#include<iostream>
using namespace std;
// 递增序列，返回第一个大等于x的元素位置
int lower_bound(int A[], int left, int right, int x) {
    int mid;
    while (left < right) {
        mid = (left + right) / 2;
        if(A[mid] >= x) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}