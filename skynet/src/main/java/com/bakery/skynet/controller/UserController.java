package com.bakery.skynet.controller;

import com.bakery.skynet.dto.UserDto;
import com.bakery.skynet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController extends RootController {

    private final UserService userService;

    @GetMapping()
    public UserDto getUser() {
        return userService.getUser();
    }

}
