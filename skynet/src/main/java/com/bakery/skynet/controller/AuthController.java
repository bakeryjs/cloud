package com.bakery.skynet.controller;

import com.bakery.skynet.dto.AuthSignInDto;
import com.bakery.skynet.dto.AuthSignUpDto;
import com.bakery.skynet.dto.JwtTokenDto;
import com.bakery.skynet.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController extends RootController {

    private final AuthService authService;

    @PostMapping("/signUp")
    public void signUp(@Valid @RequestBody AuthSignUpDto dto) {
        authService.signUp(dto.toUser());
    }

    @PostMapping("/signIn")
    public JwtTokenDto signIn(@Valid @RequestBody AuthSignInDto dto) {
        return authService.signIn(dto.toUser());
    }

}
