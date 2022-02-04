#include<iostream>
#include<cmath>
using namespace std;
const int maxn = 11;
int count = 0, n, P[maxn], hashTable[maxn] = {false};
void generateP(int index) {
    if(index == n+1) {
        // 递归边界（最大n行），生成一个排列
        bool flag = true;
        for(int i = 1; i <= n; i++) {
            for(int j = i+1; j <= n; j++) {
                if(abs(i - j) == abs(P[i] - P[j])) {
                    // 在一条对角线上
                    flag = false;
                    break;
                }
            }
        }
        if(flag) {
            count++;    // 方案合法
        }
        return;
    }
    // 递归主体，index行x列或者index列x行
    for(int x = 1; x <= n; x++) {
        if(hashTable[x] == false) {
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
    cout << count;
    return 0;
}