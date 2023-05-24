package com.bakery.skynet.service.impl;

import com.bakery.skynet.dto.UserDto;
import com.bakery.skynet.model.User;
import com.bakery.skynet.repository.UserRepository;
import com.bakery.skynet.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDto getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        User userDb = userRepository.findById(user.getUuid()).orElseThrow(() ->
                new UsernameNotFoundException("User with uuid " + user.getUuid() + " not found"));
        return UserDto.from(userDb);
    }

}
