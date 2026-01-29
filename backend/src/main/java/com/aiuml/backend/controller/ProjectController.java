package com.aiuml.backend.controller;

import com.aiuml.backend.model.Diagram;
import com.aiuml.backend.model.Project;
import com.aiuml.backend.service.AiAnalysisService;
import com.aiuml.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class ProjectController {
    private final ProjectService projectService;
    private final AiAnalysisService aiService;

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
        log.info("[API: POST] Analyze Project ID: {}. Requirements: {}", id, requirements);
        
        String plantUml = aiService.generatePlantUml(requirements, "CLASS");
        Map<String, String> patterns = aiService.detectPatterns(requirements);
        
        return Map.of(
            "plantUml", plantUml,
            "patterns", patterns
        );
    }

    @PostMapping("/{id}/upload")
    public Map<String, String> uploadRequirements(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
        String content = new String(file.getBytes(), StandardCharsets.UTF_8);
        return Map.of("content", content);
    }
}
