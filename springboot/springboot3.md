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


