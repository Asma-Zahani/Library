package library.library_backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;


@Data
@Embeddable
public class AuthorDTO {
    @Column(name = "author_key")
    private String key;
    private String name;

}
