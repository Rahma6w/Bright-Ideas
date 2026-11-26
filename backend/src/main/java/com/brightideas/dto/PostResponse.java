package com.brightideas.dto;

import com.brightideas.entity.*;
import java.time.LocalDateTime;
import java.util.List;

public record PostResponse(Long postId, String title, String description, Category category,
    Visibility visibility, PostStatus status, List<String> mediaUrls, boolean communityReactionEnabled,
    LocalDateTime createdAt, LocalDateTime updatedAt, Long userId, String authorName) {
    public static PostResponse from(Post post) {
        return new PostResponse(post.getPostId(), post.getTitle(), post.getDescription(), post.getCategory(),
            post.getVisibility(), post.getStatus(), List.copyOf(post.getMediaUrls()), post.isCommunityReactionEnabled(),
            post.getCreatedAt(), post.getUpdatedAt(), post.getUser().getUserId(), post.getUser().getName());
    }
}
