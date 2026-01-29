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
    private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=";

    private void validateEnvironment() {
        if ("UNSET".equals(apiKey) || apiKey.startsWith("${")) {
            log.error("[CRITICAL] GEMINI_API_KEY is not configured!");
            throw new IllegalStateException("Gemini API Key is missing");
        }
        log.info("[CHECK] API Key validated.");
    }

    public String generatePlantUml(String requirements, String type) {
        log.info("[STAGE: START] UML Generation Requested. Type: {}", type);
        validateEnvironment();

        try {
            log.info("[STAGE: PROMPT] Contacting Gemini for Domain Extraction...");
            String domainModel = extractDomainModel(requirements);
            log.info("[STAGE: SUCCESS] Domain Model Received.");
            
            log.info("[STAGE: PROMPT] Generating PlantUML Code...");
            String plantUml = generateUmlFromModel(domainModel, type);
            log.info("[STAGE: SUCCESS] PlantUML Received.");
            
            return sanitizePlantUml(plantUml);
        } catch (Exception e) {
            log.error("[STAGE: ERROR] AI Analysis failed: {}", e.getMessage());
            return "@startuml\nnode \"AI SERVICE ERROR\" as err\n@enduml";
        }
    }

    private String extractDomainModel(String requirements) {
        String prompt = "You are a Senior Architect. Extract entity-relationship model from: " + requirements + ". Output ONLY a concise list of entities and their relations.";
        return callGemini(prompt);
    }

    private String generateUmlFromModel(String domainModel, String type) {
        String prompt = "You are a PlantUML expert. Generate ONLY valid @startuml...@enduml code for a " + type + " diagram based on: " + domainModel + ". Do NOT use markdown code blocks. NO explanations.";
        return callGemini(prompt);
    }

    private String callGemini(String promptText) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> part = Map.of("text", promptText);
            Map<String, Object> content = Map.of("parts", List.of(part));
            Map<String, Object> body = Map.of("contents", List.of(content));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(GEMINI_URL + apiKey, entity, String.class);

            JsonNode root = objectMapper.readTree(response.getBody());
            String text = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
            
            log.info("[RAW AI RESPONSE]: {}", text);
            return text != null ? text : "";
        } catch (Exception e) {
            log.error("[STAGE: ERROR] Gemini call failed: {}", e.getMessage());
            return "Error: " + e.getMessage();
        }
    }

    private String sanitizePlantUml(String raw) {
        if (raw == null || raw.isBlank()) return "@startuml\nnode \"Extraction Failed\"\n@enduml";
        String cleaned = raw.replaceAll("(?i)```plantuml", "")
                           .replaceAll("(?i)```", "")
                           .trim();
        
        if (!cleaned.contains("@startuml")) {
            cleaned = "@startuml\n" + cleaned;
        }
        if (!cleaned.contains("@enduml")) {
            cleaned = cleaned + "\n@enduml";
        }
        return cleaned;
    }

    public Map<String, String> detectPatterns(String requirements) {
        Map<String, String> patterns = new LinkedHashMap<>();
        try {
            String prompt = "Architect Expert. Analyze requirements: " + requirements + 
                          ". Identify 3 design patterns. Output format: 'PatternName | Explanation'. One per line. Only the list.";
            String response = callGemini(prompt);

            if (response != null && !response.isBlank()) {
                for (String line : response.split("\\n")) {
                    String cleanLine = line.replaceAll("^[-*#\\d.\\s]+", "").trim();
                    if (cleanLine.contains("|")) {
                        String[] parts = cleanLine.split("\\|", 2);
                        patterns.put(parts[0].trim(), parts[1].trim());
                    } else if (cleanLine.contains(":")) {
                        String[] parts = cleanLine.split(":", 2);
                        patterns.put(parts[0].trim(), parts[1].trim());
                    }
                }
            }
        } catch (Exception e) {
            log.error("Pattern detection failed: {}", e.getMessage());
        }
        
        if (patterns.isEmpty()) {
            patterns.put("Singleton", "Ensures a class has only one instance.");
            patterns.put("Factory Method", "Interface for creating objects in a superclass.");
            patterns.put("Observer", "A way of notifying multiple objects about any events that happen to the object they're observing.");
        }
        
        return patterns;
    }
}
