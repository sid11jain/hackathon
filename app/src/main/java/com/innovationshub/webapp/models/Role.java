package com.innovationshub.webapp.models;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author AJAYLAMBA
 * @since Jun 18, 2020 7:23 PM
 */
@Data
@Document(collection = "roles")
@EntityScan
public class Role {

    @Id
    private String id;

    private String role;
}
