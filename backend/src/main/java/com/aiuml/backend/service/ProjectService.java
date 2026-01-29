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

    public Project updateProject(Long id, Project projectDetails) {
        Project project = getProject(id);
        if (projectDetails.getName() != null)
            project.setName(projectDetails.getName());
        if (projectDetails.getDescription() != null)
            project.setDescription(projectDetails.getDescription());
        if (projectDetails.getRequirements() != null)
            project.setRequirements(projectDetails.getRequirements());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public void deleteUserProjects(Long userId) {
        List<Project> projects = projectRepository.findByUserId(userId);
        projectRepository.deleteAll(projects);
    }
}
