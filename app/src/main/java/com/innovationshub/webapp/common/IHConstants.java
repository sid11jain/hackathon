package com.innovationshub.webapp.common;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Class to define constants used in the application.
 *
 * @author AJAYLAMBA
 * @since Jun 13, 2020 2:52 PM
 */
public class IHConstants {

    /**
     * Collection name for Campaign.
     */
    public static final String CAMPAIGN_COLLECTION = "Campaign";

    /**
     * Collection name for Idea.
     */
    public static final String IDEA_COLLECTION = "Idea";

    public static final String DATABASE_NAME_FIELD = "spring.data.mongodb.database";

    /**
     * Temp use only, later on will read from application properties file
     */
    public static final String DATABASE_NAME = "innovationHub";

    public static final String CAMPAIGN_NAME_FIELD = "campaignName";

    public static final String NAME_FIELD = "name";

    public static final String CAMPAIGN_FIELD = "campaign";
}
