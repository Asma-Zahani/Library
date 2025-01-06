package library.library_backend.init;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import library.library_backend.entity.User;
import library.library_backend.repository.UserRepository;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    public void initUser() {
        System.out.println("Checking if admin exist...");
        if (userRepository.findByUsername("Admin") != null) {
            System.out.println("Admin exist...");
        }
        else {
            System.out.println("Creating admin...");
            User admin = new User();
            admin.setUsername("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(new BCryptPasswordEncoder().encode("123456"));
            admin.setRoles("ADMIN");
            userRepository.save(admin);
            System.out.println("Admin created.");
        }
    }
}
