// 回溯
#include<iostream>
#include<cmath>
using namespace std;
const int maxn = 11;
int n, count = 0, P[maxn], hashTable[maxn] = {false};
// P矩阵，hashTable记录x列是否已有皇后
void generateP(int index) {
    if(index == n+1) {
        count++;
        return;
    }
    for(int x = 1; x <= n ;x++) {
        if(hashTable[x] == false){
            bool flag = true;
            for(int pre = 1; pre < index; pre++) {
                if(abs(pre - index) == abs(P[pre] - x)) {
                    // 这一列皇后的放置和之前已经产生冲突，不用再递归
                    flag = false;
                    break;
                }
            }
            if(flag) {
                P[index] = x;
                hashTable[x] = true;
                generateP(index+1);
                hashTable[x] = false;
            }
        }
    }
}
int main() {
    cin >> n;
    generateP(1);
    cout << count;
    return 0;
}