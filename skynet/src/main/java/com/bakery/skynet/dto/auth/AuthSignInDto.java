package com.bakery.skynet.dto.auth;

import com.bakery.skynet.model.User;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class AuthSignInDto {

    @NotBlank(message = "email cannot be empty")
    @Email(message = "wrong email format")
    private String email;

    @NotBlank(message = "password cannot be empty")
    private String password;

    public User toUser() {
        return User.builder()
                .email(email)
                .password(password)
                .build();
    }

}
