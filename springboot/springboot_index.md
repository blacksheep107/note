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
- Spring Boot外部配置文件。加载位于项目外部的配置文件。指定外部配置文件的路径：
    - spring.config.location
    用命令行参数指定，会使项目默认配置文件失效（application.yml）
    ```
    java -jar {JAR} --spring.config.location={外部配置文件路径}
    ```
    - spring.config.additional-location不会使项目默认的配置文件失效，会互补，它的优先级最高。
- Spring Boot配置优先级
    - **命令行参数**
    - 来自java:comp/env的JNDI属性
    - Java系统属性（System.getProperties()）
    - 操作系统环境变量
    - random.*属性
    - **配置文件(yaml, properties)**
    - @Configuration注解类上的@PropertySource指定的配置文件
    - 通过SpringApplicationDefaultProperties指定的默认属性值
- Spring Boot的自动配置。Spring Factories机制是一种服务发现机制，Spring Boot会扫描所有jar包类路径下的META-INF/spring.factories文件，并读取其中内容进行实例化。
- 所有Spring Boot项目的主启动类上都用@**SpringBootApplication**注解，这是一个组合元注解，包含@SpringBootConfiguration和@EnableAutoConfiguration
- 统一**日志**框架。日志分类有日志门面（为Java日志访问提供接口）和日志实现（日志门面的具体实现，log4j就是）。通常日志由一个日志门面和一个日志实现组合搭建，Spring Boot选用SLF4J+Logback
- 日志级别：
    - trace：追踪，指明程序运行轨迹。
    - debug：调试，一般作为最低级别，trace少用。
    - info：输出重要信息。
    - warn：警告。
    - error：错误。
- 日志输出格式
<table>
<tbody>
<tr>
<th>
序号</th>
<th>
输出格式</th>
<th>
说明</th>
</tr>
<tr>
<td>
1</td>
<td>
%d{yyyy-MM-dd HH:mm:ss, SSS}&nbsp;</td>
<td>
日志生产时间,输出到毫秒的时间</td>
</tr>
<tr>
<td>
2</td>
<td>
%-5level&nbsp;</td>
<td>
输出日志级别，-5 表示左对齐并且固定输出 5 个字符，如果不足在右边补 0</td>
</tr>
<tr>
<td>
3</td>
<td>
%logger 或&nbsp;%c&nbsp;</td>
<td>
logger 的名称</td>
</tr>
<tr>
<td>
4</td>
<td>
&nbsp;%thread&nbsp;&nbsp;或 %t</td>
<td>
输出当前线程名称</td>
</tr>
<tr>
<td>
5</td>
<td>
%p</td>
<td>
日志输出格式</td>
</tr>
<tr>
<td>
6</td>
<td>
%message&nbsp;或 %msg&nbsp;或&nbsp;%m</td>
<td>
日志内容，即 logger.info("message")</td>
</tr>
<tr>
<td>
7</td>
<td>
%n</td>
<td>
换行符</td>
</tr>
<tr>
<td>
8</td>
<td>
%class 或 %C</td>
<td>
输出 Java 类名</td>
</tr>
<tr>
<td>
9</td>
<td>
&nbsp;%file 或 %F</td>
<td>
输出文件名</td>
</tr>
<tr>
<td>
10</td>
<td>
%L</td>
<td>
输出错误行号</td>
</tr>
<tr>
<td>
11</td>
<td>
%method&nbsp;或&nbsp;%M</td>
<td>
输出方法名</td>
</tr>
<tr>
<td>
12</td>
<td>
%l&nbsp;</td>
<td>
输出语句所在的行数, 包括类名、方法名、文件名、行数</td>
</tr>
<tr>
<td>
13</td>
<td>
hostName</td>
<td>
本地机器名</td>
</tr>
<tr>
<td>
14</td>
<td>
hostAddress</td>
<td>
本地 ip 地址</td>
</tr>
</tbody>
</table>

- 在类路径下放logback-spring.cml配置文件，由Spring Boot解析，这样既可以通过Spring Boot的Profile实现不同环境中使用不同的日志配置。
    - 在application.yml中激活profile，on-profile:dev
    - 修改logback-spring.xml的内容
    ```
    <springProfile name="dev">
        <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ----> [%thread] ---> %-5level %logger{50} - %msg%n</pattern>
    </springProfile>
    ```
- spring-boot-starter-web（Web启动器）。Spring MVC是Spring提供的一个基于MVC设计模式的轻量级Web开发框架，Spring Boot提供了Web启动器，提供了嵌入的Servlet容器以及SpringMVC的依赖。
- 只要在pom.xml中引入了spring-boot-starter-web就可以直接用Spring MVC开发。idea创建项目时选择web就有了。
- Spring Boot**静态资源映射**。默认提供3种静态资源映射规则。
- **WebJars**映射。以Jar形式为Web项目提供资源文件，可以把Web前端资源（JS、CSS等）打成一个个Jar包，然后把这些Jar包部署到maven中央仓库进行统一管理。
    - 访问WebJars官网，找到所需资源的pom依赖，导入到项目中。
    - 通过WebJars引入的前端资源存放在类路径classpath下的“/META-INF/resources/webjars/” 目录中。
- 默认静态资源映射。访问项目中任意资源（即“/**”）时，会默认从类路径找资源文件。
    - /META-INF/resources/
    - /resources/
    - /static/
    - /public/
- 在src/main/resources/static下创建一个hello.html，访问“http://localhost:8080/hello.html”可以看到。
- 静态资源文件夹下的index.html被称为静态首页，会被/**映射，访问/或者/index.html时都会跳转到首页。
- Spring Boot不用传统xml配置文件，通过配置类（标注@Configuration的类，相当于一个xml配置文件）以JavaBean形式进行相关配置。
- 扩展Spring MVC。通过定义一个WebMvcConfigurer类型（实现WebMvcConfigurer接口）的配置类（标注@Configuration，但不标注@EnableWebMvc注解的类）来扩展Spring MVC，这样不但能保留Spring Boot对Spring MVC的自动配置，还能额外增加自定义的Spring MVC配置。
    - 把css、fonts、js及其中的静态资源移动到src/main/resources/static，在www.**config**包下，创建一个配置类并实现WebMvcCongifurer接口，重写addViewControllers()方法。
    ```java
    @Configuration
    public class MyMvcConfig implements WebMvcConfigurer {
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            // 当访问/或/index.html时注解跳转到login
            registry.addViewController("/").setViewName("login");
            registry.addViewController("/index.html").setViewName("login");
        }
    }
    ```
    - 在www.controller下创建一个Controller
    ```java
    @Controller
    public class IndexController {
        // 跳转到登录页面
        @GetMapping(value = {"/login"})
        public String loginPage() {
            return "login";
        }
    }
    ```
    - 把login.html移动到src/main/resources/templates下，访问"http://localhost:8080/"就能跳转到登录页。
    - 这种方法好像有点怪，正常前后端分离的业务流程应该不是这样做的吧。
- 全面接管Spring MVC，抛弃Spring Boot对Spring MVC的全部自动配置。只要在@Configuration上加@EnableWebMvc
- Spring Boot国际化，Internationalization建成i18n（i和n为首尾，18为中间的字符数），指软件开发时应具备支持多语言的功能。
- **拦截器**
    - 定义拦截器。创建一个拦截器类并实现HandlerInterceptor接口。HandlerInterceptor接口中定义3个方法：
        - **preHandle**：在**控制器处理请求方法前**执行，返回true表示继续向下执行，false表示中断后续操作。
        - **postHandl**：在控制处理请求方法调用之后、解析视图之前执行，可以通过此方法对请求域中的模型和视图做进一步修改。
        - **afterCompletion**：在视图渲染结束后执行，可以实现资源清理、记录日志。
    - 注册拦截器。创建一个实现WebMvcConfigurer接口的配置类（@Configuration），重写addInterceptors方法，并在该方法中调用registry.addInterceptor方法将自定义的拦截器注册到容器中。
    - 指定拦截规则。将拦截器注册到容器中后，指定拦截器的拦截规则。
    ```java
    @Slf4j
    @Configuration
    public class MyConfig implements WebMvcConfigurer {
        ......
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            log.info("注册拦截器");
            registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**") //拦截所有请求，包括静态资源文件
                    .excludePathPatterns("/", "/login", "/index.html", "/user/login", "/css/**", "/images/**", "/js/**", "/fonts/**"); //放行登录页，登陆操作，静态资源
        }
    }
    ```
- JDBC访问数据库
    - 导入JDBC场景启动器和数据库驱动。
    ```xml
    <!--导入JDBC的场景启动器-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jdbc</artifactId>
    </dependency>
    <!--导入数据库驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    ```
    - 在application.yml中配置数据源
    ```yaml
    #数据源连接信息
    spring:
    datasource:
        username: root
        password: root
        url: jdbc:mysql://127.0.0.1:3306/bianchengbang_jdbc
        driver-class-name: com.mysql.cj.jdbc.Driver
    ```
    - 用DataSource（数据源组件）和**JdbcTemplate**（访问数据库的组件）来访问数据库。
- 访问mysql数据库流程
    - 管理员cmd打开C:\Program Files\MySQL\MySQL Server 5.7\bin，输入net start mysql，show databases;查看数据库。启动成功后
    ```java
    @SpringBootTest
    class DemoApplicationTests {
        @Autowired
        DataSource dataSource;
        @Autowired
        JdbcTemplate jdbcTemplate;
        @Test
        void contextLoads() throws SQLException {
            System.out.println("默认数据源为：" + dataSource.getClass());
            System.out.println("数据库连接实例：" + dataSource.getConnection());
            Integer i = jdbcTemplate.queryForObject("SELECT count(*) from `user`", Integer.class);
            System.out.println("表中共有" + i + "条数据");
        }
    }
    ```