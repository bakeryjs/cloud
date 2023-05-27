package com.bakery.skynet.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "containers")
public class Container {

    @Id
    @Column(nullable = false)
    private String id;

    @ManyToOne
    @JoinColumn(name = "server_id")
    private Server server;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
