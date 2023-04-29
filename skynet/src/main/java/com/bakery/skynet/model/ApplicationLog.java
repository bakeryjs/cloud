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
@Table(name = "applications_logs")
public class ApplicationLog extends Log {

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;

}
