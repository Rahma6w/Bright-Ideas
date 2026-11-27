package com.workshop.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String username;
    private String bio;
    private String location;
    private String avatarUrl;
    private LocalDate joinedDate;
    private int ideasShared;
    private int credits;
    private int posts;
    private int comments;
    private int supporting;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_badges", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "badge")
    private List<String> badges;
}
