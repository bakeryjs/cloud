package com.bakery.skynet.dto.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtTokenDto {
    private String token;
}
