package com.innovationshub.webapp.models;

import java.io.Serializable;
import java.util.Set;

import lombok.Data;

/**
 * @author AJAYLAMBA
 * @since Jun 17, 2020 11:51 PM
 */
@Data
public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String token;
    private final Set<String> roles;
    private final boolean loginSuccessful;
    private final String message;
    private final String fullName;
}
