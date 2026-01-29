package com.aiuml.backend.repository;

import com.aiuml.backend.model.PatternSuggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatternSuggestionRepository extends JpaRepository<PatternSuggestion, Long> {
    List<PatternSuggestion> findByProjectId(Long projectId);
}
