package com.brightideas.dto;

import com.brightideas.entity.Category;
import com.brightideas.entity.PostStatus;
import com.brightideas.entity.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

public record PostRequest(
    @NotBlank @Size(max = 120) String title,
    @NotBlank @Size(max = 10000) String description,
    @NotNull Category category,
    @NotNull Visibility visibility,
    @NotNull PostStatus status,
    List<@Size(max = 500) String> mediaUrls,
    Boolean communityReactionEnabled
) { }
