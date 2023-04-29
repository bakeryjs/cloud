package com.bakery.skynet.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String identifier;

    @Column(nullable = false)
    private String name;

    private String address;

    @Column(nullable = false)
    private State state;

    @Column(name = "state_changed", nullable = false)
    private Timestamp stateChanged;

    @ManyToOne
    @JoinColumn(name = "server_id")
    private PerformingServer server;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "application", cascade = CascadeType.REMOVE)
    private List<ApplicationLog> logs;

}
