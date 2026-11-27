package com.workshop.service;

import com.workshop.model.Post;
import com.workshop.model.Project;
import com.workshop.model.UserProfile;
import com.workshop.repository.PostRepository;
import com.workshop.repository.ProjectRepository;
import com.workshop.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserProfileRepository profileRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private PostRepository postRepo;

    @Override
    public void run(String... args) {
        // Create user profile
        UserProfile profile = new UserProfile();
        profile.setName("Alex Morgan");
        profile.setUsername("alexmakes");
        profile.setBio("Product designer, neighbourhood optimist, and chronic \"what if?\" asker. Building things that bring us a little closer.");
        profile.setLocation("London, UK");
        profile.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80");
        profile.setJoinedDate(LocalDate.of(2025, 3, 1));
        profile.setIdeasShared(28);
        profile.setCredits(1240);
        profile.setPosts(28);
        profile.setComments(142);
        profile.setSupporting(63);
        profile.setBadges(List.of("Community Builder", "Golden Supporter"));
        profileRepo.save(profile);

        // Create projects
        Project p1 = new Project();
        p1.setTitle("The listening bench");
        p1.setDescription("Prototype study · 8 images");
        p1.setImageUrl("https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=700&h=420&q=80");
        p1.setType("prototype");
        p1.setProfile(profile);
        projectRepo.save(p1);

        Project p2 = new Project();
        p2.setTitle("Small places. Shared stories.");
        p2.setDescription("Community design toolkit");
        p2.setType("field_notes");
        p2.setFieldNotesLabel("FIELD NOTES / 001");
        p2.setFieldNotesSubtitle("Community design toolkit");
        p2.setFileInfo("PDF · 12 pages · 2.4 MB");
        p2.setProfile(profile);
        projectRepo.save(p2);

        // Create posts
        Post post1 = new Post();
        post1.setTitle("A park bench that brings people together.");
        post1.setCategory("Tech");
        post1.setCreatedAt(LocalDateTime.now().minusHours(2));
        post1.setProfile(profile);
        postRepo.save(post1);

        Post post2 = new Post();
        post2.setTitle("Designing for the third place: lessons from local spaces.");
        post2.setCategory("Design");
        post2.setCreatedAt(LocalDateTime.now().minusDays(1));
        post2.setProfile(profile);
        postRepo.save(post2);

        Post post3 = new Post();
        post3.setTitle("How community soundscapes can shape urban wellbeing.");
        post3.setCategory("Research");
        post3.setCreatedAt(LocalDateTime.now().minusDays(3));
        post3.setProfile(profile);
        postRepo.save(post3);
    }
}
