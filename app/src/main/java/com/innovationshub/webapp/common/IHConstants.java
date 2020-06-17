package com.innovationshub.webapp.common;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

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
    public static final String CAMPAIGN_COLLECTION = "campaign";

    /**
     * Collection name for Idea.
     */
    public static final String IDEA_COLLECTION = "idea";

    public static final String CAMPAIGN_NAME = "campaignName";


    public static final String DATABASE_NAME_PROPERTY = "spring.data.mongodb.database";

    /**
     * Temp use only, later on will read from application properties file
     */
    public static final String DATABASE_NAME = "innovationHub";
    public static final String APPLICATION_JSON = "application/json";

    public static final String CAMPAIGN_NAME_FIELD = "campaignName";
    public static final String NAME_FIELD = "name";
    public static final String CAMPAIGN_FIELD = "campaign";
    public static final String DESCRIPTION_FIELD = "description";
    public static final String VALUE_FIELD = "value";

    public static final String FILTERS = "filters";

    public static final String STRING_TYPE = "string";
    public static final String NUMERIC_TYPE = "numeric";
    public static final String DATE_TYPE = "date";

    public static final String FILTER_NAME = "filterName";
    public static final String VALUE_TYPE = "valueType";
    public static final String VALUES = "values";
    public static final String CAMPAIGN_VALUES = "campaignValues";

    public static final Set<String> IDEA_STATIC_FIELDS =
            new HashSet<>(Arrays.asList("name", "description", "postedOn", "submittedBy", "contributors"));
}
