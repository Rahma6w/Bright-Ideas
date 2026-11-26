package com.brightideas.service;

import com.brightideas.dto.*;
import com.brightideas.entity.*;
import com.brightideas.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    public PostService(PostRepository postRepository, UserRepository userRepository) { this.postRepository = postRepository; this.userRepository = userRepository; }

    @Transactional
    public PostResponse create(PostRequest request, Long userId) {
        validateSubmissionStatus(request.status());
        User user = getActiveUser(userId);
        Post post = new Post(request.title().trim(), request.description().trim(), request.category(), request.visibility(),
            request.status(), request.mediaUrls(), request.communityReactionEnabled() == null || request.communityReactionEnabled(), user);
        return PostResponse.from(postRepository.save(post));
    }
    @Transactional
    public PostResponse update(Long postId, PostRequest request, Long userId) {
        validateSubmissionStatus(request.status());
        Post post = ownedPost(postId, userId);
        post.update(request.title().trim(), request.description().trim(), request.category(), request.visibility(),
            request.status(), request.mediaUrls(), request.communityReactionEnabled() == null || request.communityReactionEnabled());
        return PostResponse.from(postRepository.save(post));
    }
    @Transactional
    public PostResponse publish(Long postId, Long userId) { Post post = ownedPost(postId, userId); post.publish(); return PostResponse.from(postRepository.save(post)); }
    @Transactional(readOnly = true)
    public PostResponse get(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Idea not found."));
        if (post.getStatus() == PostStatus.DELETED || (post.getVisibility() == Visibility.PRIVATE && !post.getUser().getUserId().equals(userId))) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Idea not found.");
        return PostResponse.from(post);
    }
    @Transactional(readOnly = true)
    public List<PostResponse> mine(Long userId) { getActiveUser(userId); return postRepository.findByUserUserIdAndStatusNotOrderByUpdatedAtDesc(userId, PostStatus.DELETED).stream().map(PostResponse::from).toList(); }
    private void validateSubmissionStatus(PostStatus status) {
        if (status != PostStatus.DRAFT && status != PostStatus.ACTIVE) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New ideas can only be saved as DRAFT or ACTIVE.");
    }
    private User getActiveUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authenticated user does not exist."));
        if (user.getStatus() != AccountStatus.ACTIVE) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This account is not active.");
        return user;
    }
    private Post ownedPost(Long postId, Long userId) {
        return postRepository.findByPostIdAndUserUserId(postId, userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Idea not found or you do not own it."));
    }
}
