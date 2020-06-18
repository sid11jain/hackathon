package com.innovationshub.webapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.innovationshub.webapp.models.User;

/**
 * @author AJAYLAMBA
 * @since Jun 18, 2020 7:28 PM
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    User findByUsername(String username);

}
