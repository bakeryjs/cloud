package com.bakery.skynet.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "containers")
public class Container {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String containerId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;

    @Column(name = "changed_at", nullable = false)
    private Timestamp changedAt;

    @Column(name = "local_network_gateway")
    private String localNetworkGateway;

    @Column(name = "local_network_ip")
    private String localNetworkIP;

    @Column(name = "ports")
    private String ports;

    @ManyToOne
    @JoinColumn(name = "server_id")
    private Server server;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
