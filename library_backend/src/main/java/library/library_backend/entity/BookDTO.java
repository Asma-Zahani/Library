package library.library_backend.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
@Data
public class BookDTO {

    private String key;
    private String title;

    private List<AuthorDTO> authors;
    private int firstPublishYear;
    @JsonProperty("cover_id")
    private String cover_Id;
    private String coverEditionKey;
    private List<String> subjects;
    private String availability;
    private String Description ;

}