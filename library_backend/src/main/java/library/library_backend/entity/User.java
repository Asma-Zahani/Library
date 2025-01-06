package library.library_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    @Column(unique = true, nullable = true)
    private String email;  // Nullable if email is optional

    private String password;

    @Column(nullable = false)
    private String roles;


    @PrePersist
    public void setDefaultRole() {
        if (this.roles == null || this.roles.isEmpty()) {
            this.roles = "USER";  // Set default role to "USER"
        }
    }
}

