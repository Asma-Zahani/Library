package library.library_backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@DiscriminatorValue("BORROW")
public class Borrow extends Transaction {
    private LocalDate dueDate;
    private LocalDate actualReturnDate;
    private boolean overdue;
}
