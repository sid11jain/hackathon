package com.innovationshub.webapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.innovationshub.webapp.models.Role;

/**
 * @author AJAYLAMBA
 * @since Jun 18, 2020 7:30 PM
 */
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRole(String role);
}
