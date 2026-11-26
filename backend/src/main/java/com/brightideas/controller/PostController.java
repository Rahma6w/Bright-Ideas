package com.brightideas.controller;

import com.brightideas.dto.*;
import com.brightideas.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    public PostController(PostService postService) { this.postService = postService; }
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public PostResponse create(@Valid @RequestBody PostRequest request, @AuthenticationPrincipal Jwt jwt) { return postService.create(request, userId(jwt)); }
    @PutMapping("/{postId}")
    public PostResponse update(@PathVariable Long postId, @Valid @RequestBody PostRequest request, @AuthenticationPrincipal Jwt jwt) { return postService.update(postId, request, userId(jwt)); }
    @PostMapping("/{postId}/publish")
    public PostResponse publish(@PathVariable Long postId, @AuthenticationPrincipal Jwt jwt) { return postService.publish(postId, userId(jwt)); }
    @GetMapping("/{postId}")
    public PostResponse get(@PathVariable Long postId, @AuthenticationPrincipal Jwt jwt) { return postService.get(postId, userId(jwt)); }
    @GetMapping("/mine")
    public List<PostResponse> mine(@AuthenticationPrincipal Jwt jwt) { return postService.mine(userId(jwt)); }
    private Long userId(Jwt jwt) { try { return Long.valueOf(jwt.getSubject()); } catch (Exception ex) { throw new org.springframework.web.server.ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token subject."); } }
}
