## pom.xml
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
<!--parent，如果依赖没有写version，就会使用来自parent的versions-->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.1.3</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
<!--包名-->
	<groupId>com.example</groupId>
	<artifactId>spring-boot-example</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>spring-boot-example</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
<!--依赖-->
	<dependencies>
		<dependency>
<!--来源-->
			<groupId>org.springframework.boot</groupId>
<!--包名-->
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
<!--build-->
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

## Start
启动类
<img width="1008" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/5335b972-1ed3-4171-97bd-63521eac949e">
Tomcat是一个提供一个java运行的环境的服务器。
<img width="711" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/2ba11b97-e404-42d0-b614-891d067bde30">

### 配置Tomcat Server
配置文件：src/main/resources/application.yml
```yml
server:
  # 启动端口，默认8080
  port: 8080

spring:
  main:
    # 启动类型，默认servlet
    web-application-type: servlet
```

每个Springboot web application包含一个embedded web server，默认是Tomcat。可以在pom换成别的server，比如jetty。
application.yml配置：https://docs.spring.io/spring-boot/docs/3.1.3/reference/htmlsingle/#features.spring-application.web-environment
<img width="482" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/cfb885b0-5f1c-477d-910d-1585f01958d8">

## 写一个接口
<img width="486" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/6a16cedd-e2ca-4a85-bfc8-5d48a9458a8f">

## Annotations 注解
@SpringBootApplication注解是个语法糖，是@Configuration（注册类里声明的Bean）、@EnableAutoConfiguration（识别依赖包中需要注册的类）、@ComponentScan（定义扫描规则，找出要注册到Spring的Bean）的简写
Java Bean就是类。

## Spring Web MVC(Model-View-Controller)
Servlet是一个处理HTTP请求和相应的程序。
在定义接口的类上面会用到@RestController注解，这个注解是@Controller和@ResponseBody组成的。marks all the mathods in the class will return a **JSON** response.
@Controller marks the class as a web controller.
@ResponseBody is a utility annotation that tells Spring to automatically serialize return value of this class's methods into HTTP response.

在method上定义的注解：@GetMapping("/path")，是@RequestMapping(RequestMethod.GET, "/path")的缩写。

Jackson把Java对象转换成JSON对象。
<img width="564" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/3603c1c6-d124-4bea-8975-fa28e1bbd7d9">

## Record class
定义一个不可变类；成员变量通过参数的形式定义；默认生成所有参数的构造方法。替代Lombook（通过注解简化getter和setter代码）
<img width="297" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/9643189d-a2b2-4f60-a5b1-9f4cc64fbc12">

## IDEA Shortcuts
command + n

## Model
创建一个class，定义好私有属性后还有这几步（都是通过快捷键做的）：
1、constructor，包括无参数的和有参数的。
2、Getter、Setter
3、equals、hashCode
4、toString

## JPA
Jakarta Persistence，直接用Java class访问数据库，不用SQL。
Spring Data JPA

## Docker
本地下一个Docker Desktop，注册，启动。
IDEA用docker-compose，docker compose up跑起来就自动连接上了。
```
services:
  db:
    container_name: postgres
    image: postgres
    environment:
      POSTGRES_USER: cm
      POSTGRES_PASSWORD: password
      PGDATA: /data/postgres
    volumes:
      - db:/data/postgres
    ports:
      - "5332:5423"
    networks:
      - db
    restart: unless-stopped
networks:
  db:
    driver: bridge
volumes:
  db:
```
<img width="1340" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/27c3af2f-a269-42ce-b4d9-0107b492eee1">

## PostgreSQL
一个JDBC Driver，Spring Data JPA基于此。
连接数据库，添加PostgreSQL和Springboot JPA依赖。
<img width="604" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/59a5886e-ef45-4c4d-a31b-ae020fb3fffe">

## 配置Springboot数据源
Hibernate和MyBatis都是持久层框架，Hibernate是全自动ORM（对象关系映射）框架，不需要关心SQL编写。Spring Data JPA就是基于Hibernate。
Hibernate就是把Java语言转换成数据库描述，所以针对不同数据库有不同的适配。hibernate.dialect就是做适配的。
```
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5332/customer
    username: cm
    password: password
  jpa:
    hibernate:
      # 每次程序结束时清空表
      ddl-auto: create-drop
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
    show-sql: true
```

## 创建数据库
- 连接docker postgres查看数据库
```
docker exec -it postgres bash
psql -U cm
\l
```
<img width="871" alt="image" src="https://github.com/blacksheep107/note/assets/63863778/fca07227-6713-4860-bafb-4d52dbf36396">


