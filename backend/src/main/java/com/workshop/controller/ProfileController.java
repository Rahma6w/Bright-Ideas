package com.workshop.controller;

import com.workshop.model.Post;
import com.workshop.model.Project;
import com.workshop.model.UserProfile;
import com.workshop.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // GET /api/profile/1
    @GetMapping("/profile/{id}")
    public ResponseEntity<UserProfile> getProfile(@PathVariable Long id) {
        return profileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/profile/username/alexmakes
    @GetMapping("/profile/username/{username}")
    public ResponseEntity<UserProfile> getProfileByUsername(@PathVariable String username) {
        return profileService.getProfileByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/profile/{id}
    @PutMapping("/profile/{id}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable Long id,
                                                      @RequestBody UserProfile updated) {
        return profileService.getProfileById(id).map(profile -> {
            profile.setName(updated.getName());
            profile.setBio(updated.getBio());
            profile.setLocation(updated.getLocation());
            return ResponseEntity.ok(profileService.saveProfile(profile));
        }).orElse(ResponseEntity.notFound().build());
    }

    // GET /api/profile/{id}/projects
    @GetMapping("/profile/{id}/projects")
    public ResponseEntity<List<Project>> getProjects(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getProjectsByProfile(id));
    }

    // GET /api/profile/{id}/posts
    @GetMapping("/profile/{id}/posts")
    public ResponseEntity<List<Post>> getPosts(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getPostsByProfile(id));
    }

    // GET /api/stats
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return profileService.getProfileById(1L).map(p ->
                ResponseEntity.ok(Map.of(
                        "credits", p.getCredits(),
                        "posts", p.getPosts(),
                        "comments", p.getComments(),
                        "supporting", p.getSupporting()
                ))
        ).orElse(ResponseEntity.notFound().build());
    }
}
