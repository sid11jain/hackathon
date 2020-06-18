package com.innovationshub.webapp.models;

import java.util.Set;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * Model class for user data.
 *
 * @author AJAYLAMBA
 * @since Jun 16, 2020 10:10 PM
 */

@Data
@Document(collection = "users")
public class User {

    //TODO: implement serialization and remove enable mongo repo from main class and test if autowire works

    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private String fullName;

    private boolean enabled;

    private Set<Role> roles;

}
