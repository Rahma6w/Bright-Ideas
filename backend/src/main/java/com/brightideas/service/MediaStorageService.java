package com.brightideas.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
public class MediaStorageService {
    private static final long MAX_SIZE = 20L * 1024 * 1024;
    private static final Set<String> ALLOWED = Set.of("png", "jpg", "jpeg", "gif", "webp", "pdf", "doc", "docx", "ppt", "pptx");
    @Value("${app.upload-dir:./uploads}") private String uploadDir;
    public String store(MultipartFile file) {
        if (file == null || file.isEmpty()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose a file to upload.");
        if (file.getSize() > MAX_SIZE) throw new ResponseStatusException(HttpStatus.PAYLOAD_TOO_LARGE, "Files must be 20 MB or smaller.");
        String original = file.getOriginalFilename() == null ? "attachment" : Paths.get(file.getOriginalFilename()).getFileName().toString();
        String extension = original.contains(".") ? original.substring(original.lastIndexOf('.') + 1).toLowerCase() : "";
        if (!ALLOWED.contains(extension)) throw new ResponseStatusException(HttpStatus.UNSUPPORTED_MEDIA_TYPE, "Allowed files: images, PDF, DOC/DOCX and PPT/PPTX.");
        String storedName = UUID.randomUUID() + "." + extension;
        try { Path directory = Path.of(uploadDir).toAbsolutePath().normalize(); Files.createDirectories(directory); Files.copy(file.getInputStream(), directory.resolve(storedName), StandardCopyOption.REPLACE_EXISTING); }
        catch (IOException ex) { throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not save the attachment."); }
        return "/uploads/" + storedName;
    }
}
