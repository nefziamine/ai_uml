package com.aiuml.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diagrams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Diagram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // CLASS, SEQUENCE, USE_CASE

    @Column(columnDefinition = "TEXT")
    private String plantUmlCode;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Project project;
}
