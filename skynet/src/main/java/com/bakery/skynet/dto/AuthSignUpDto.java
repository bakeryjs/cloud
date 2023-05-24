package com.bakery.skynet.dto;

import com.bakery.skynet.model.User;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AuthSignUpDto {

    @NotBlank(message = "fullName cannot be empty")
    private String fullName;

    @NotBlank(message = "email cannot be empty")
    private String email;

    @NotBlank(message = "password cannot be empty")
    private String password;

    private String country;
    private String organization;

    public User toUser() {
        return User.builder()
                .fullName(fullName)
                .email(email)
                .password(password)
                .country(country)
                .organization(organization)
                .build();
    }

}
