# Rust
- 预编译静态型语言
- .rs扩展名。
- 编译
  ```shell
  rustc main.rs
  ```
- 在Linux，生成一个可执行文件：main
- 在windows，生成两个文件：main.exe、main.pdb。使用cmd时，会有一个包含调试信息，扩展名为pdb的文件。

## Cargo
- rust的构建系统和包管理器。类比maven和npm。
- 命令
  ```
  cargo new  # 创建项目
  cargo build # 构建项目
  cargo run # 构建并运行
  cargo check # 在不生成二进制文件的情况下构建项目来检查错误
  ```
- 构建结果在target/debug


