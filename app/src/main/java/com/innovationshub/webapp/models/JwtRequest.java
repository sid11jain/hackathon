package com.innovationshub.webapp.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author AJAYLAMBA
 * @since Jun 17, 2020 11:50 PM
 */
@Data
@AllArgsConstructor
public class JwtRequest implements Serializable {

    private String username;
    private String password;

}
