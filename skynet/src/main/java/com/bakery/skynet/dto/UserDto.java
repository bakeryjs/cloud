package com.bakery.skynet.dto;

import com.bakery.skynet.model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private String fullName;
    private String email;
    private String country;
    private String organization;

    public static UserDto from(User user) {
        return UserDto.builder()
                .fullName(user.getFullName())
                .email(user.getEmail())
                .country(user.getCountry())
                .organization(user.getOrganization())
                .build();
    }

}
