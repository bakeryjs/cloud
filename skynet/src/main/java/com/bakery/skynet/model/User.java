package com.bakery.skynet.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User implements UserDetails {

    private static final String SUBJECT_FORMAT = "%s,%s";
    private static final String SUBJECT_SEPARATOR = ",";

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID uuid;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String country;

    @Column
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<PerformingServer> servers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Application> applications;

    public static User fromSubject(String subject) {
        String[] args = subject.split(SUBJECT_SEPARATOR);
        return User.builder()
                .uuid(UUID.fromString(args[0]))
                .email(args[1])
                .build();
    }

    public String toSubject() {
        return String.format(SUBJECT_FORMAT, uuid, email);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
