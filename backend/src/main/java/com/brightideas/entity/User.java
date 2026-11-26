package com.brightideas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(nullable = false, length = 80) private String name;
    @Column(nullable = false, unique = true, length = 120) private String email;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Role role = Role.USER;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private AccountStatus status = AccountStatus.ACTIVE;
    @Column(nullable = false) private LocalDateTime createdAt = LocalDateTime.now();

    protected User() {}
    public User(String name, String email, Role role) { this.name = name; this.email = email; this.role = role; }
    public Long getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public AccountStatus getStatus() { return status; }
}
