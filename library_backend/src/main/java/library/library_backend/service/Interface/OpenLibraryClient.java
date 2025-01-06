package library.library_backend.service.Interface;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "openLibraryClient", url = "https://openlibrary.org/")
public interface OpenLibraryClient {

    // Search books by category
    @GetMapping("/subjects/{category}.json")
    JsonNode getBooksByCategory(@RequestParam("category") String category);

    @GetMapping("/{archiveId}.json")
    JsonNode getBooksByArchiveId(@PathVariable String archiveId);
}
