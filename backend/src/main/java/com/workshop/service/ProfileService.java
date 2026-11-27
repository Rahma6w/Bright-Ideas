package com.workshop.service;

import com.workshop.model.Post;
import com.workshop.model.Project;
import com.workshop.model.UserProfile;
import com.workshop.repository.PostRepository;
import com.workshop.repository.ProjectRepository;
import com.workshop.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired private UserProfileRepository profileRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private PostRepository postRepo;

    public List<UserProfile> getAllProfiles() {
        return profileRepo.findAll();
    }

    public Optional<UserProfile> getProfileById(Long id) {
        return profileRepo.findById(id);
    }

    public Optional<UserProfile> getProfileByUsername(String username) {
        return profileRepo.findByUsername(username);
    }

    public UserProfile saveProfile(UserProfile profile) {
        return profileRepo.save(profile);
    }

    public List<Project> getProjectsByProfile(Long profileId) {
        return projectRepo.findByProfileId(profileId);
    }

    public List<Post> getPostsByProfile(Long profileId) {
        return postRepo.findByProfileIdOrderByCreatedAtDesc(profileId);
    }

    public Post savePost(Post post) {
        return postRepo.save(post);
    }
}
