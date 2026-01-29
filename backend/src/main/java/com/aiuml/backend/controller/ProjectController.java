package com.aiuml.backend.controller;

import com.aiuml.backend.model.Project;
import com.aiuml.backend.service.AiAnalysisService;
import com.aiuml.backend.service.DocumentParsingService;
import com.aiuml.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ProjectController {
    private final ProjectService projectService;
    private final AiAnalysisService aiService;
    private final DocumentParsingService parsingService;

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        log.info("[API: POST] Create Project: {}", project.getName());
        return projectService.createProject(project);
    }

    @GetMapping("/user/{userId}")
    public java.util.List<Project> getUserProjects(@PathVariable Long userId) {
        return projectService.getUserProjects(userId);
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable Long id) {
        return projectService.getProject(id);
    }

    @PostMapping("/{id}/analyze")
    public Map<String, Object> analyzeProject(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String requirements = payload.get("requirements");
        String type = payload.getOrDefault("type", "CLASS");
        log.info("[API: POST] Analyze Project ID: {}. Type: {}. Requirements Length: {}", id, type,
                requirements != null ? requirements.length() : 0);

        String plantUml = aiService.generatePlantUml(requirements, type);
        Map<String, String> patterns = aiService.detectPatterns(requirements);

        return Map.of(
                "plantUml", plantUml,
                "patterns", patterns);
    }

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        log.info("[API: PUT] Update Project: {}", id);
        return projectService.updateProject(id, project);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> deleteProject(@PathVariable Long id) {
        log.info("[API: DELETE] Delete Project: {}", id);
        projectService.deleteProject(id);
        return Map.of("message", "Project deleted successfully");
    }

    @DeleteMapping("/user/{userId}")
    public Map<String, String> deleteAllUserProjects(@PathVariable Long userId) {
        log.info("[API: DELETE] Delete All Projects for User: {}", userId);
        projectService.deleteUserProjects(userId);
        return Map.of("message", "All projects deleted successfully");
    }

    @PostMapping("/{id}/upload")
    public Map<String, String> uploadRequirements(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        log.info("[API: POST] Uploading file for project {}: {}", id, file.getOriginalFilename());
        String content = parsingService.parseDocument(file);
        return Map.of("content", content);
    }
}
