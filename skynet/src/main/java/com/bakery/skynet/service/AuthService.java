package com.bakery.skynet.service;

import com.bakery.skynet.dto.JwtTokenDto;
import com.bakery.skynet.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthService extends UserDetailsService {
    void signUp(User user);

    JwtTokenDto signIn(User user);
}
