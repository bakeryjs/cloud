package com.bakery.skynet.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "servers")
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String address;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "changed_at", nullable = false)
    private Timestamp changedAt;

    @OneToMany(mappedBy = "server", cascade = CascadeType.REMOVE)
    private List<Container> containers;

}
