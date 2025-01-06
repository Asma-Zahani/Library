package library.library_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import library.library_backend.repository.CategoryRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    @NonNull
    private String archiveId;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "book_categories",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @JsonManagedReference
    private List<Category> categories = new ArrayList<>();
    @NonNull
    private String coverId;
    @NonNull
    private String title;
    @NonNull
    private int firstPublishYear;
    @ElementCollection
    @CollectionTable(name = "book_authors", joinColumns = @JoinColumn(name = "book_id"))
    @Column(name = "author_name")
    @NonNull
    private List<AuthorDTO> authors;
    @NonNull
    private String coverEditionKey;
    @NonNull
    private String availabilityStatus;
    @Column(name = "description", columnDefinition = "TEXT")
    @NonNull
    private String Description ;
    private String ImageUrl;
    private BigDecimal price;
    private int availableQuantity;
    @JsonBackReference
    @OneToMany(mappedBy = "book")
    private List<Transaction> transactions;
    @Column(nullable = false)
    private boolean deleted = false;
}

