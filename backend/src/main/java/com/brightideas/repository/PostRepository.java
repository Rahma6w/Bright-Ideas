package com.brightideas.repository;
import com.brightideas.entity.Post;
import com.brightideas.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserUserIdAndStatusNotOrderByUpdatedAtDesc(Long userId, PostStatus status);
    Optional<Post> findByPostIdAndUserUserId(Long postId, Long userId);
}
