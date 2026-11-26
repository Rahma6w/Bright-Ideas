package com.brightideas.controller;

import com.brightideas.service.MediaStorageService;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController @RequestMapping("/api/media")
public class MediaController {
    private final MediaStorageService storage;
    public MediaController(MediaStorageService storage) { this.storage = storage; }
    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> upload(@RequestPart("file") @NotNull MultipartFile file, @AuthenticationPrincipal Jwt jwt) {
        return Map.of("url", storage.store(file));
    }
}
