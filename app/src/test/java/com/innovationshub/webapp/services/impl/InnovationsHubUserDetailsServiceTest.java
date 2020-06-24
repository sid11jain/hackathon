package com.innovationshub.webapp.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;

import com.innovationshub.webapp.models.Role;
import com.innovationshub.webapp.models.User;
import com.innovationshub.webapp.repository.UserRepository;

/**
 * Tests {@link InnovationsHubUserDetailsService} class.
 *
 * @author AJAYLAMBA
 * @since Jun 25, 2020 1:22 AM
 */
@SpringBootTest
@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class InnovationsHubUserDetailsServiceTest {

    private UserRepository userRepository = Mockito.mock(UserRepository.class);
    @InjectMocks
    private InnovationsHubUserDetailsService userDetailsService;

    /**
     * Test to ensure that user details are returned correctly.
     *
     */
    @Test
    public void testLoadUserByUsername() {
        String username = "ajay";
        String password = "encrypedPassword";
        User user = new User();
        Role role = new Role();
        role.setId("admin");
        role.setRole("ADMIN");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        user.setUsername(username);
        user.setPassword(password);

        Mockito.when(userRepository.findByUsername(username)).thenReturn(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        Assert.assertNotNull(userDetails);
        Assert.assertEquals(username, userDetails.getUsername());
        Assert.assertEquals(password, userDetails.getPassword());
        Mockito.verify(userRepository, Mockito.times(1)).findByUsername(username);
    }
}
