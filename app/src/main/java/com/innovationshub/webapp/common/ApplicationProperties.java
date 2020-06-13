package com.innovationshub.webapp.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


/**
 * Class to get property application property values.
 *
 * @author AJAYLAMBA
 * @since Jun 13, 2020 3:04 PM
 */
@Configuration
@Service
public class ApplicationProperties {

    @Autowired
    private Environment environment;

    /**
     * Returns property value if it is defined otherwise null is returned.
     *
     * @param propertyName
     * @return
     */
    public String getProperty(String propertyName) {
        return environment.getProperty(propertyName);
    }
}
