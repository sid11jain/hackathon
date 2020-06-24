package com.innovationshub.webapp.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.innovationshub.security.authentication.JwtTokenUtil;
import com.innovationshub.webapp.models.JwtRequest;
import com.innovationshub.webapp.models.JwtResponse;
import com.innovationshub.webapp.models.User;
import com.innovationshub.webapp.services.impl.InnovationsHubUserDetailsService;

/**
 * @author AJAYLAMBA
 * @since Jun 17, 2020 11:47 PM
 */
@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private InnovationsHubUserDetailsService userDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);
        // Get all the roles user have
        Set<String> roles = new HashSet<>();
        userDetails.getAuthorities().forEach(authority -> roles.add(authority.getAuthority()));

        // For now pass username in response to use at client side, this would avoid reloading all users and finding
        // out fullName from them
        User user = userDetailsService.getUserByUsername(authenticationRequest.getUsername());

        // and pass the roles in response along with token
        // these roles will be used to grant read only or write access to user
        // we are going with this approach for now - later on will grant access based on request URL
        return ResponseEntity.ok(new JwtResponse(token, roles, true, "Success", user.getFullName()));
    }

    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
