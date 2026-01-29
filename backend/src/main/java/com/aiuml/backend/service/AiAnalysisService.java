package com.aiuml.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Slf4j
public class AiAnalysisService {

    @Value("${spring.ai.openai.api-key:UNSET}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String[] VERSION_PRIORITY = { "v1beta", "v1" };

    // UPDATED MODEL NAMES BASED ON 2026 ENVIRONMENT DETECTION
    private final String[] MODEL_PRIORITY = {
            "gemini-flash-lite-latest",
            "gemini-pro-latest",
            "gemini-3-flash-preview",
            "gemini-2.5-flash-lite",
            "gemini-2.0-flash-exp",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro-latest"
    };

    private void validateEnvironment() {
        if ("UNSET".equals(apiKey) || apiKey.startsWith("${")) {
            log.error("[CRITICAL] GEMINI_API_KEY is not configured!");
            throw new IllegalStateException("Gemini API Key is missing.");
        }
        if (apiKey.length() > 8) {
            log.info("[AUTH] Using Key: {}...{}", apiKey.substring(0, 4), apiKey.substring(apiKey.length() - 4));
        }
    }

    public String generatePlantUml(String requirements, String type) {
        log.info("[STAGE: START] Architecture Analysis. Type: {}", type);
        validateEnvironment();

        try {
            // Detect if input is code or prompt
            boolean isCodeInput = requirements.contains("{") || requirements.contains("import ")
                    || requirements.contains("public class");
            String contextPrompt = isCodeInput ? "Identify classes, interfaces, and methods from this code: "
                    : "Extract key entities and relationships from these requirements: ";

            String domainModel = extractDomainModel(requirements, contextPrompt);
            if (domainModel.startsWith("ERROR:"))
                return "graph TD\n  Error[\"AI Error: " + domainModel + "\"]";

            String mermaidCode = generateMermaidFromModel(domainModel, type);
            if (mermaidCode.startsWith("ERROR:"))
                return "graph TD\n  Error[\"AI Error: " + mermaidCode + "\"]";

            return sanitizeMermaid(mermaidCode);
        } catch (Exception e) {
            log.error("[STAGE: ERROR] AI Analysis failed: {}", e.getMessage());
            return "graph TD\n  Error[\"AI SERVICE ERROR: " + e.getMessage().replace("\"", "'") + "\"]";
        }
    }

    private String extractDomainModel(String requirements, String contextPrompt) {
        String prompt = "Act as a Senior Architect. " + contextPrompt + requirements +
                "\nOutput ONLY a structured list of entities and relationships. No prose.";
        return callGemini(prompt);
    }

    private String generateMermaidFromModel(String domainModel, String type) {
        String specificInstructions = "";
        if ("CLASS".equalsIgnoreCase(type)) {
            specificInstructions = "Start with 'classDiagram'. STRICT UML RULES: " +
                    "\n1. Classes implementing Interfaces MUST use 'Class ..|> Interface' (dashed line with arrow). " +
                    "\n2. Inheritance uses 'Child --|> Parent'. " +
                    "\n3. Arrow direction MUST be FROM implementation TO definition. " +
                    "\n4. Use 'class ClassName { type attr }'. No spaces in names.";
        } else if ("SEQUENCE".equalsIgnoreCase(type)) {
            specificInstructions = "Start with 'sequenceDiagram'. Use 'participant'. Use '->>' for solid and '-->>' for dashed arrows.";
        } else if ("USECASE".equalsIgnoreCase(type)) {
            specificInstructions = "Use 'graph LR'. Represent actors as 'Actor((Actor Name))' and usecases as 'UC1([Use Case Name])'. Link them with arrows '-->'.";
        } else {
            specificInstructions = "Start with 'graph TD'.";
        }

        String prompt = "Generate Mermaid.js code. " + specificInstructions +
                "\nModel: " + domainModel +
                "\nOutput ONLY raw code. No markdown.";
        return callGemini(prompt);
    }

    private String callGemini(String promptText) {
        for (String version : VERSION_PRIORITY) {
            for (String modelName : MODEL_PRIORITY) {
                try {
                    String fullModelName = "models/" + modelName;
                    String url = String.format("https://generativelanguage.googleapis.com/%s/%s:generateContent?key=%s",
                            version, fullModelName, apiKey);

                    log.info("[ATTEMPT] Calling {}/{}...", version, modelName);

                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.APPLICATION_JSON);
                    headers.set("x-goog-api-key", apiKey);

                    Map<String, Object> part = Map.of("text", promptText);
                    Map<String, Object> content = Map.of("parts", List.of(part));
                    Map<String, Object> body = Map.of("contents", List.of(content));

                    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
                    ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

                    if (response.getStatusCode() == HttpStatus.OK) {
                        JsonNode root = objectMapper.readTree(response.getBody());
                        String result = root.path("candidates").get(0).path("content").path("parts").get(0).path("text")
                                .asText();
                        if (result != null && !result.isBlank()) {
                            log.info("[SUCCESS] Response from {}/{}", version, modelName);
                            return result;
                        }
                    }
                } catch (org.springframework.web.client.HttpClientErrorException e) {
                    log.warn("[STATUS] {}/{} returned {}", version, modelName, e.getStatusCode());
                } catch (Exception e) {
                    log.error("[ERROR] {}/{}: {}", version, modelName, e.getMessage());
                }
            }
        }
        return "ERROR: All Gemini models (including Flash-Lite and Pro-Latest) failed. Check API key project permissions.";
    }

    private String sanitizeMermaid(String raw) {
        if (raw == null)
            return "";
        String result = raw.replaceAll("(?s)```mermaid\\s*(.*?)\\s*```", "$1")
                .replaceAll("(?s)```\\s*(.*?)\\s*```", "$1")
                .replaceAll("(?i)^mermaid", "")
                .trim();
        StringBuilder clean = new StringBuilder();
        for (String line : result.split("\\n")) {
            String t = line.trim();
            if (t.isEmpty() || t.startsWith("Note:") || t.startsWith("Here") || t.startsWith("Certainly")
                    || t.startsWith("```"))
                continue;
            clean.append(line).append("\n");
        }
        return clean.toString().trim();
    }

    public Map<String, String> detectPatterns(String requirements) {
        log.info("[STAGE: PATTERNS] Detecting design patterns for requirements...");
        validateEnvironment();
        Map<String, String> patterns = new LinkedHashMap<>();
        try {
            String prompt = "Act as a Software Architecture expert. Analyze these requirements: " + requirements +
                    "\nIdentify the 3 most relevant design patterns. " +
                    "\nOutput format: Pattern Name | Brief Explanation (max 15 words) " +
                    "\nOne per line. No other text.";
            String resultText = callGemini(prompt);

            if (resultText != null && !resultText.isBlank()) {
                String[] lines = resultText.split("\\n");
                for (String line : lines) {
                    if (line.contains("|")) {
                        String[] parts = line.split("\\|");
                        patterns.put(parts[0].trim(), parts[1].trim());
                    }
                }
            }
        } catch (Exception e) {
            log.error("Pattern detection failed: {}", e.getMessage());
        }

        if (patterns.isEmpty()) {
            patterns.put("Strategy", "Handles different implementations dynamically.");
            patterns.put("Singleton", "Ensures a single instance of a resource.");
            patterns.put("Observer", "Notifies dependent objects of state changes.");
        }
        return patterns;
    }
}
