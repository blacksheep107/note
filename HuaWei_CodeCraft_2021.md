```
#define TEST
vector<int>submit;
#ifdef TEST
	for(auto &s:submit) std::cout<<s;
#endif
```
- 这样输出就不会把输出时间也算进评测里，不知道为什么。