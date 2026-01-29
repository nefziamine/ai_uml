package com.aiuml.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pattern_suggestions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatternSuggestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @ManyToOne
    @JoinColumn(name = "project_id")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Project project;
}
