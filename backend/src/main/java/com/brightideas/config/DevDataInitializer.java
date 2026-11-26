package com.brightideas.config;

import com.brightideas.entity.*;
import com.brightideas.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DevDataInitializer {
    @Bean CommandLineRunner seedDemoUser(UserRepository users) {
        return args -> { if (users.count() == 0) users.save(new User("Alex Morgan", "alex@example.test", Role.USER)); };
    }
}
