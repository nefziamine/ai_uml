package com.aiuml.backend.service;

import com.aiuml.backend.model.Project;
import com.aiuml.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getUserProjects(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project getProject(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
    }
}
