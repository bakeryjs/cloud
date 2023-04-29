package com.bakery.skynet.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "servers_logs")
public class PerformingServerLog extends Log {

    @ManyToOne
    @JoinColumn(name = "server_id")
    private PerformingServer server;

}
