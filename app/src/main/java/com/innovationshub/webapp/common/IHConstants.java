package com.innovationshub.webapp.common;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Class to define constants used in the application.
 *
 * @author AJAYLAMBA
 * @since Jun 13, 2020 2:52 PM
 */
public class IHConstants {

    public static final String COLLECTION = "collection";
    public static final String DOCUMENTS = "documents";

    /**
     * Collection name for Campaign.
     */
    public static final String CAMPAIGN_COLLECTION = "campaign";

    /**
     * Collection name for Idea.
     */
    public static final String IDEA_COLLECTION = "idea";

    public static final String USERS_COLLECTION = "users";
    public static final String WORKFLOW_COLLECTION = "workflow";
    public static final String TAGS_COLLECTION = "tags";
    public static final String FILTERS_COLLECTION = "filters";

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

    /** A common property to use when creating any entity document. This is to cater the issue with Mongo date search - as we have provide explicit date object - different from received json.
     *
     */
    public static final String FIELD_CREATED_ON = "createdOn";
    public static final String START_DATE = "startDate";
    public static final String END_DATE = "endDate";
    public static final String CAMPAIGN_START_DATE = "campaignStartDate";
    public static final String CAMPAIGN_END_DATE = "campaignEndDate";

    public static final String IDEA_FIELD_POSTED = "postedOn";
    public static final String USERS_FIELD_USERNAME = "username";
    public static final String USERS_FIELD_FULLNAME = "fullName";

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_BUSINESS = "BUSINESS";

    public static final String FILTERS = "filters";

    public static final String STRING_TYPE = "string";
    public static final String NUMERIC_TYPE = "numeric";
    public static final String DATE_TYPE = "date";
    public static final String OP_LT = "LT";
    public static final String OP_LTE = "LTE";
    public static final String OP_GT = "GT";
    public static final String OP_GTE = "GTE";
    public static final String OP_EQ = "EQ";
    public static final String OP_NEQ = "NEQ";
    public static final String OP_IN = "IN";
    public static final String OP_NIN = "NIN";
    /**
     * Map to hold comparison operators for date and numeric values.
     */
    public static final Map<String, String> OPERATOR_MAP = new HashMap<String, String>()
    {{
       put(OP_LT, "$lt");
       put(OP_LTE, "$lte");
       put(OP_GT, "$gt");
       put(OP_GTE, "$gte");
       put(OP_EQ, "$eq");
       put(OP_IN, "$in");
       put(OP_NIN, "$nin");
       put(OP_NEQ, "$neq");
    }};

    public static final String KEY_ID = "id";
    public static final String KEY_VALUE = "value";

    public static final String FILTER_NAME = "filterName";
    public static final String VALUE_TYPE = "valueType";
    public static final String NESTED_ON = "nestedOn";
    public static final String NESTED_FIELD = "nestedField";
    public static final String SEARCH_TYPE = "searchType";
    public static final String LIKE_SEARCH = "like";
    public static final String COMPARISON_OP = "comparisonOp";
    public static final String EQUALS_SEARCH = "equals";
    public static final String VALUES = "values";
    public static final String CAMPAIGN_VALUES = "campaignValues";

    public static final Set<String> IDEA_STATIC_FIELDS =
            new HashSet<>(Arrays.asList("name", "description", "postedOn", "submittedBy", "contributors"));

    public static final String LIKES_FIELD="likes";
    public static final String LIKES_COUNT_FIELD="likesCount";
    public static final String FAVOURITES_FIELD="favourites";
    public static final String FAVOURITES_COUNT_FIELD="favouritesCount";
    public static final String COMMENTS_FIELD="comments";
    public static final String COMMENTS_COUNT_FIELD="commentsCount";

    public static final int ENTITY_ALREADY_EXIST = 101;
    public static final int ERROR_CREATING_ENTITY = 102;


    public static final String ENTITY_ALREADY_EXIST_MESSAGE = "is already present. Please choose another";
    public static final String ERROR_CREATING_ENTITY_MESSAGE = " cannot be added";

}
