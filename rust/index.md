# Rust
- 预编译静态型语言
- .rs扩展名。
- 编译
  ```shell
  rustc main.rs
  ```
- 在Linux，生成一个可执行文件：main
- 在windows，生成两个文件：main.exe、main.pdb。使用cmd时，会有一个包含调试信息，扩展名为pdb的文件。

# Cargo
- rust的构建系统和包管理器。类比maven和npm。
- 命令
  ```
  cargo new  # 创建项目
  cargo build # 构建项目
  cargo run # 构建并运行
  cargo check # 在不生成二进制文件的情况下构建项目来检查错误
  ```
- 构建结果在target/debug
## Crate
- rust的依赖/库叫crate。https://crates.io/。跑完build生成一个lock文件。

# 基础
- rust中的变量，默认是不可变的。用let定义变量。用let mut 来使变量可变。
- 创建一个新的字符串。即返回一个String实例。::语法表示new是String类型的一个关联函数，关联函数是针对类实现的，而不是实例；即静态方法。new是创建类型实例的惯用函数名。
  ```rust
  let mut a = String::new();
  ```
- 调用输入输出io::stdin也是用的关联函数。调用read_line方法从标准输入句柄获取用户输入，传入一个引用，rust也用&标志引用。引用默认也是不可变的，因此要加mut让它可变。
- read_line返回一个类型为**Result**的值，Result是一种枚举类型，成员是Ok和Err。如果Result实例的值是Err，expect()会导致程序崩溃，并把expect的参数作为信息显示。没有用expect接收的Result会引起rust警告，expect的目的就是希望程序出问题的时候立即崩溃。
  ```rust
  io::stdin().read_line(&mut guess).expect("Failed to read line");
  ```
- {}占位符。打印变量用。

## match表达式
- 用来比较。一个match表达式由分支构成，一个分支（arms）包含一个模式（pattern）和match开头的值与分支模式匹配时的回调代码。
- **Rust是静态强类型，同时也有类型推断**。不会比较字符串类型和数字类型。

## String转Number
- trim去除前后空格，parse把字符串转换成其它类型。通过let number: u32，冒号直接指定。

## 循环
- loop {} break，continue

# 常见编程概念
- Rust的变量默认是不可变的。
  - 为什么：代码易于推导，如果要改变，显示添加mut，这样更明确的表达可变的意图。
- Rust还有常量。常量就没有mut了。用const声明。不能设置为只能在运行时计算出的值，这一点和JS有区别，和Java这种静态类型语言比较像。
  > 想起JS规范的常量命名要求，如果是运行时计算出的值，const定义的常量命名可以是驼峰，比如const appleCount = 5 * x;如果是固定的一个数字之类的，常量名要是大写，如const APPLE_COUNT = 5;

## 隐藏 Shadowing
- 可以定义一个与之前变量同名的新变量：这时，第一个变量被第二个变量隐藏了。可以不断地隐藏上一个变量，新的隐藏变量也有自己的作用域。
  > 如果不断隐藏，代码会不会变得很可怕……
- 隐藏，实际上还是创建一个新变量，可以改变值的类型，只是复用了这个名字（注意，mut声明可变的变量，是不能改变类型的）。这样的话，这个功能相当于就是可以重复用相同的变量名嘛……滥用的话代码风格会很烂，但是感觉很符合新手的思维。
  > 不用思考命名了，好。

## 数据类型
- 分两种：标量Scalar、复合Compound。
- 标量有整型、浮点、布尔、字符。
