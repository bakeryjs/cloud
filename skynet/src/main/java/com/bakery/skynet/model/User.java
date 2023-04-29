package com.bakery.skynet.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(generator = "uuid2")
    private UUID uuid;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
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

}
