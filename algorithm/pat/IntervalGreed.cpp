#include<iostream>
#include<cstdio>
#include<algorithm>
#include<vector>
using namespace std;
const int maxn = 110;
struct Interval {
    int x, y;
}I[maxn];
bool cmp(Interval a, Interval b) {
    if(a.x != b.x)  return a.x > b.x;
    return a.y < b.y;
}
int main() {
    int n;
    while(scanf("%d", &n), n != 0) {
        vector<Interval> arr;
        for(int i = 0; i < n; i++) {
            scanf("%d%d", &I[i].x, &I[i].y);
        }
        sort(I, I+n, cmp);
        int ans = 1, lastX = I[0].x;
        // ans不相交区间个数，lastX上一个选中区域的左端点
        arr.push_back(I[0]);
        for(int i = 1; i < n; i++) {
            if(I[i].y <= lastX) {
                lastX = I[i].x;
                arr.push_back(I[i]);
                ans++;
            }
        }
        printf("%d\n", ans);
        for(int i = 0; i < arr.size(); i++) {
            printf("%d, %d\n", arr[i].x, arr[i].y);
        }
    }
    return 0;
}