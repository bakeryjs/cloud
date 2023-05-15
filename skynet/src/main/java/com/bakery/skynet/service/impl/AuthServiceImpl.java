package com.bakery.skynet.service.impl;

import com.bakery.skynet.dto.JwtTokenDto;
import com.bakery.skynet.exception.InvalidCredentialsException;
import com.bakery.skynet.exception.UserAlreadyExistsException;
import com.bakery.skynet.model.User;
import com.bakery.skynet.repository.UserRepository;
import com.bakery.skynet.security.JwtUtil;
import com.bakery.skynet.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void signUp(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw UserAlreadyExistsException.commonMessage(user.getEmail());
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public JwtTokenDto signIn(User user) {
        User userDb = userRepository.findByEmail(user.getEmail())
                .orElseThrow(InvalidCredentialsException::commonMessage);
        if (!passwordEncoder.matches(user.getPassword(), userDb.getPassword())) {
            throw InvalidCredentialsException.commonMessage();
        }
        return JwtTokenDto.builder()
                .token(jwtUtil.generate(userDb.toSubject()))
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() ->
                new UsernameNotFoundException("User with email " + email + " not found"));
    }

}
