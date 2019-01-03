package com.johnson3yo.ariproxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AriproxyApplication {

    public static void main(String[] args) {
        SpringApplication.run(AriproxyApplication.class, args);
    }


}
