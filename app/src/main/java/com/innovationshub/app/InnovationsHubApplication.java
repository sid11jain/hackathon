package com.innovationshub.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan({ "com.innovationshub.webapp", "com.innovationshub.security" })
@EntityScan("com.innovationshub.webapp")
@EnableMongoRepositories("com.innovationshub.webapp.repository")
public class InnovationsHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(InnovationsHubApplication.class, args);
    }

    /*@Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            System.out.println("Let's inspect the beans provided by Spring Boot:");

            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }

        };
    }*/

//    @Configuration
//    protected static class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//        protected void configure(HttpSecurity http) throws Exception {
//            http.httpBasic().disable();
//            http.authorizeRequests()
//                    .antMatchers("/index.html", "/home", "/login").permitAll()
//                    .anyRequest().authenticated();
//        }
//    }

}
