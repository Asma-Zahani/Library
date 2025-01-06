package library.library_backend.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@DiscriminatorValue("PURCHASE")
public class Purchase extends Transaction {

    private BigDecimal price;
    private int quantity;

    public Purchase(User user, Book book, LocalDateTime transactionDate, BigDecimal price, int quantity) {
        super(user, book, transactionDate);
        this.price = price;
        this.quantity = quantity;
    }
}
