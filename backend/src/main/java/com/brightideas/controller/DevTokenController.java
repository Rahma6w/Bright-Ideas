package com.brightideas.controller;

import com.brightideas.entity.*;
import com.brightideas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;

@RestController @RequestMapping("/api/dev")
public class DevTokenController {
    private final UserRepository users; private final JwtEncoder encoder;
    @Value("${app.dev-token-enabled:true}") private boolean enabled;
    public DevTokenController(UserRepository users, JwtEncoder encoder) { this.users = users; this.encoder = encoder; }
    @PostMapping("/token")
    public Map<String, String> token() {
        if (!enabled) throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND);
        User user = users.findAll().stream().findFirst().orElseThrow();
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer("bright-ideas-local").issuedAt(now).expiresAt(now.plusSeconds(3600)).subject(user.getUserId().toString()).claim("scope", "USER").build();
        return Map.of("token", encoder.encode(JwtEncoderParameters.from(JwsHeader.with(MacAlgorithm.HS256).build(), claims)).getTokenValue());
    }
}
