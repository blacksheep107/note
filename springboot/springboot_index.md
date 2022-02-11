# SpringBoot
- http://c.biancheng.net/spring_boot/starter.html
- 在Spring的基础上做的框架-Spring Boot，有大量开箱即用的依赖模块。
    - Spring Boot应用可以独立运行，以jar包的形式。
    - 使用内置Servlet容器（例如Tomcat），无需达成WAR包。
    - 提供starter简化Maven配置。Spring Boot提供一系列“starter”项目对象模型（POMS）来简化Maven配置。
    - 提供大量默认配置，通过配置文件修改配置。
    - 可以对正在运行的项目提供监控。
    - 不需要xml配置即可实现Spring的所有配置。
- 设置@Controller，出现whitelabel Error Page，因为controller包位置放错，要和启动类放在同层级。
- **Starter**启动器，整合多个场景下各种可能用到的依赖，用户只要在maven中导入starter依赖。e.g.spring-boot-starter-web能为web开发场景提供所需要的依赖。在**pom.xml**中引入。
- SpringBoot默认使用的全局配置文件：**application.properties**、**application.yml**
- **YAML语言**以数据为中心的标记语言，文件后缀yml或yaml。YAML用缩进表示层级，不能用tab只能用空格，同级元素左侧对齐。
- SpringBoot配置绑定，就是把配置文件中的值和JavaBean中对应的属性进行绑定。
    - @ConfigurationProperties注解，可以把全局配置文件中的配置数据绑定到JavaBean中。**标志在类名上**。
        - 在application.yml中添加自定义属性，在实体类中把配置文件中的属性映射到这个实体类上。**@ConfigurationProperties（prefix = "person"）**
    - **@Value**注解，只需要读取配置文件中的某一个配置时。只支持基本数据类型的封装。**标注在属性上**。
- **@PropertySource** 与SpringBoot无关的配置应该写在一个单独的配置文件中，并在对应的JavaBean上用@PropertySource注解指向该配置文件。e.g.person.properties文件
- 导入Spring配置。
    - **@ImportResource**导入Spring配置文件。
    - e.g.beans.xml的Spring配置文件，引入personService的JavaBean
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

        <bean id="personService" class="net.biancheng.www.service.impl.PersonServiceImpl"></bean>
    </beans>
    ```
    在项目主启动类上注解@ImportResource导入这个配置文件，使其中的内容生效。
    - 全注解方式加载Spring配置，使用
    **@Configuration注解定义配置类**（相当于Spring的配置文件），配置类中包含被@Bean注解的方法，相当于Spring配置文件中的<bean>标签定义的组件。这些@Bean注解的方法会构件bean定义（```<bean></bean>```），方法的返回值会以组件的形式添加到容器中，组建的id就是方法名。
- **Spring Boot Profile（多环境配置）**
    - 开发环境、测试环境、生产环境，数据库不同。
    - 在main/resources下添加4个配置文件
    ```
    application.properties：主配置文件
    application-dev.properties：开发环境配置文件
    application-test.properties：测试环境配置文件
    application-prod.properties：生产环境配置文件
    ```
    - 在application.properties中指定默认端口号，并配置生产环境的profile(prod)
    ```properties
    # 默认端口号
    server.port=8080
    # 激活指定的profile
    spring.profiles.active=prod
    ```
    - 在application-dev.properties中，指定开发环境端口号，同理，用这种方式设定不同环境下不同端口号。
    ```properties
    server.port=8081
    ```
- yml配置和properties类似，也是4个文件
    ```yaml
    # 默认配置
    server:
        port: 8080
    # 切换配置
    spring:
        profiles:
            active: dev # 激活开发环境配置
    ```
- 把Spring Boot项目打包成jar文件
```
mvn clean package
```
- 启动项目并激活开发环境的profile
```
java -jar helloworld-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```
- 虚拟机参数激活，在Spring Boot项目运行时，指定虚拟机参数来激活指定的profile
```
java -Dspring.profiles.active=prod -jar helloworld.jar
```
- 默认配置文件
    - Spring Boot项目启动时会扫描5个位置的application.properties或yml文件，并把它们作为默认配置文件，优先级按顺序。file:指根目录，classpath:指类路径，即resources目录。
    ```
    1. file:../config/
    2. file:../config/*/
    3. file:../
    4. classpath:/config/
    5. classpath:/
    ```
- yml文件的格式一定要正确，冒号后要加空格。
```yaml
# 项目根目录下
# 上下文路径为 /abc
server:
    servlet:
        context-path: /abc
```
```yaml
# resources/config目录下
server:
    port: 8084
    servlet:
    context-path: /helloworld
```
```yaml
# resource/
# 优先级最低，默认配置
server:
    port: 8080
```
- 在controller包下创建一个Controller类，注解@RequestMapping("/test")
    - 项目中存在多个默认配置文件，根目录下/config/优先级最高，因此项目上下文路径为"/abc"
    - 类路径下的config目录配置文件优先级高于类路径下的配置文件，因此端口号为8084
    - 以上所有配置互补，所以访问路径为"http://localhost:8084/abc"
    - 加上controller的注解，访问"http://localhost:8084/abc/test"接口得到服务器响应。
- Spring Boot外部配置文件。加载位于项目外部的配置文件。