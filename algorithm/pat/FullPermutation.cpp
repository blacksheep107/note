// 全排列 递归
#include<iostream>
using namespace std;
const int maxn = 11;
int n, P[maxn], hashTable[maxn] = {false};
void generateP(int index) {
    if(index == n+1) {
        // 递归边界，已处理完1~n位，输出一个排列
        for(int i = 1; i <= n; i++) {
            cout << P[i];
        }
        cout << endl;
    }
    for(int x = 1; x <= n; x++) {
        if(hashTable[x] == false) {
            // x不在P[0]~P[index-1]中，可以放入
            P[index] = x;
            hashTable[x] = true;
            generateP(index+1);
            hashTable[x] = false;
        }
    }
}
int main() {
    cin >> n;
    generateP(1);
    return 0;
}