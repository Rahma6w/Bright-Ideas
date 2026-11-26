package com.brightideas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    @Column(nullable = false, length = 120) private String title;
    @Column(nullable = false, length = 10000) private String description;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 30) private Category category;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Visibility visibility;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private PostStatus status;
    @ElementCollection @CollectionTable(name = "post_media_urls", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "media_url", length = 500) private List<String> mediaUrls = new ArrayList<>();
    @Column(nullable = false) private boolean communityReactionEnabled = true;
    @Column(nullable = false) private LocalDateTime createdAt;
    @Column(nullable = false) private LocalDateTime updatedAt;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") private User user;

    protected Post() {}
    public Post(String title, String description, Category category, Visibility visibility, PostStatus status, List<String> mediaUrls, boolean communityReactionEnabled, User user) {
        this.title = title; this.description = description; this.category = category; this.visibility = visibility;
        this.status = status; this.mediaUrls = mediaUrls == null ? new ArrayList<>() : new ArrayList<>(mediaUrls);
        this.communityReactionEnabled = communityReactionEnabled; this.user = user;
        this.createdAt = LocalDateTime.now(); this.updatedAt = this.createdAt;
    }
    public void update(String title, String description, Category category, Visibility visibility, PostStatus status, List<String> mediaUrls, boolean communityReactionEnabled) {
        this.title = title; this.description = description; this.category = category; this.visibility = visibility;
        this.status = status; this.mediaUrls = mediaUrls == null ? new ArrayList<>() : new ArrayList<>(mediaUrls);
        this.communityReactionEnabled = communityReactionEnabled; this.updatedAt = LocalDateTime.now();
    }
    public void publish() { if (status == PostStatus.DELETED) throw new IllegalStateException("Deleted ideas cannot be published."); this.status = PostStatus.ACTIVE; this.updatedAt = LocalDateTime.now(); }
    public Long getPostId() { return postId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Category getCategory() { return category; }
    public Visibility getVisibility() { return visibility; }
    public PostStatus getStatus() { return status; }
    public List<String> getMediaUrls() { return mediaUrls; }
    public boolean isCommunityReactionEnabled() { return communityReactionEnabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public User getUser() { return user; }
}
