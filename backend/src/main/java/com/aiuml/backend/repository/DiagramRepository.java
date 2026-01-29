package com.aiuml.backend.repository;

import com.aiuml.backend.model.Diagram;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiagramRepository extends JpaRepository<Diagram, Long> {
    List<Diagram> findByProjectId(Long projectId);
}
