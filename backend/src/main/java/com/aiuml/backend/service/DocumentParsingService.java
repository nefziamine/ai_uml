package com.aiuml.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class DocumentParsingService {
    private final Tika tika = new Tika();

    public String parseDocument(MultipartFile file) {
        log.info("[STAGE: PARSE] Parsing document: {}, Content Type: {}", file.getOriginalFilename(), file.getContentType());
        try {
            // Tika automatically detects format (PDF, DOCX, TXT, etc.) and extracts text
            String content = tika.parseToString(file.getInputStream());
            
            if (content == null || content.isBlank()) {
                log.warn("[STAGE: PARSE] Document parsed but returned empty content.");
                return "";
            }
            
            log.info("[STAGE: PARSE] Successfully extracted {} characters.", content.length());
            return content.trim();
        } catch (Exception e) {
            log.error("[STAGE: ERROR] Failed to parse document: {}", e.getMessage());
            return "Error parsing document: " + e.getMessage();
        }
    }
}
