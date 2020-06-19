package com.innovationshub.webapp.util;

import java.util.ArrayList;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.innovationshub.webapp.common.IHConstants;

/**
 * Utility class for database related operations.
 *
 * @author AJAYLAMBA
 * @since Jun 13, 2020 9:45 PM
 */
public class DBUtility {

    private static Logger LOG = LoggerFactory.getLogger(DBUtility.class);

    /**
     * Generic method to build queries based on filters passed.
     * The structure of filter should be as defined in {@link static/schema/FilterSchema}
     *
     * @param filterConditions
     * @return
     */
    public static String buildQuery(Map filterConditions) {
        String defaultQuery = "{}";
        StringBuilder query = new StringBuilder();
        try {
            if (filterConditions == null || filterConditions.size() == 0) {
                return defaultQuery;
            }
            //TODO: Implement logic to search based on key, instead of value
            //This array will contain values of different filters
            ArrayList<Map> filtersList = (ArrayList) filterConditions.get(IHConstants.FILTERS);
            if (filtersList == null || filtersList.size() == 0) {
                return defaultQuery;
            }
            //for each filer, add query in 'and' clause
            query.append("{ $and : [ ");
            for (int filterIndex = 0; filterIndex < filtersList.size(); filterIndex++) {
                Map filter = filtersList.get(filterIndex);
                //If filter is not valid, return default query which would show all the results
                if (!isFilterValid(filter)) {
                    return defaultQuery;
                }
                String filterName = (String) filter.get(IHConstants.FILTER_NAME);
                String valueType = (String) filter.get(IHConstants.VALUE_TYPE);
                Boolean nestedOn = (Boolean) filter.get(IHConstants.NESTED_ON);
                String searchType = (String) filter.get(IHConstants.SEARCH_TYPE);
                String comparisonOp = (String) filter.get(IHConstants.COMPARISON_OP);
                //each filer can have more than one value
                //we need to add 'in' clause for these values
                ArrayList values = (ArrayList) filter.get(IHConstants.VALUES);
                if (IHConstants.EQUALS_SEARCH.equals(searchType)) {
                    // values.removeAll(Arrays.asList(null,"")); -- this can be used to remove null values
                    //if field is one of the static field in idea, directly add the field name
                    if (!nestedOn) {
                        if (IHConstants.STRING_TYPE.equals(valueType)) {
                            query.append(" { " + filterName + ": { $in: [");
                        } else {
                            // It means we are dealing with date or numeric values
                            query.append(" { " + filterName + ": { " + IHConstants.OPERATOR_MAP.get(comparisonOp) + ": ");
                            if (IHConstants.DATE_TYPE.equals(valueType)) {
                                // parse date from string
                                query.append("ISODate(\"");
                            }
                        }
                    } else {
                        //if field is part of campaign values, search nested document
                        if (IHConstants.STRING_TYPE.equals(valueType)) {
                            query.append(
                                    " { \'" + IHConstants.CAMPAIGN_VALUES + "." + filterName + "." + IHConstants.VALUE_FIELD + "\': { $in: [");
                        } else {
                            // It means we are dealing with date or numeric values
                            query.append(" { \'"
                                    + IHConstants.CAMPAIGN_VALUES
                                    + "."
                                    + filterName
                                    + "."
                                    + IHConstants.VALUE_FIELD
                                    + "\': { "
                                    + IHConstants.OPERATOR_MAP.get(comparisonOp)
                                    + ": ");
                            if (IHConstants.DATE_TYPE.equals(valueType)) {
                                // parse date
                                query.append("ISODate(\"");
                            }
                        }
                    }
                    if (IHConstants.STRING_TYPE.equals(valueType)) {
                        for (int valIndex = 0; valIndex < values.size(); valIndex++) {
                            String value = (String) values.get(valIndex);
                            query.append("\"" + value + "\"");
                            if (valIndex != values.size() - 1) {
                                query.append(",");
                            }
                        }
                        query.append("] } }");
                    } else {
                        String value = (String) values.get(0);
                        query.append(value);
                        if (IHConstants.DATE_TYPE.equals(valueType)) {
                            query.append("\")");
                        }
                        query.append(" } }");
                    }

                } else if (IHConstants.LIKE_SEARCH.equals(searchType)) {
                    if (!nestedOn) {
                        query.append(" { " + filterName + ": {\'$regex\':\'");
                    } else {
                        query.append(" { \'" + IHConstants.CAMPAIGN_VALUES + "." + filterName + "." + IHConstants.VALUE_FIELD + "\': {\'$regex\':\'");
                    }
                    for (int valIndex = 0; valIndex < values.size(); valIndex++) {
                        String value = (String) values.get(valIndex);
                        query.append(value);
                        if (valIndex != values.size() - 1) {
                            query.append("|");
                        }
                    }
                    query.append("\'");
                    //case insensitive clause
                    query.append(",\'$options\': \'i\'");
                    //closing braces
                    query.append("}}");
                }
                if (filterIndex != filtersList.size() - 1) {
                    query.append(",");
                }
            }
            query.append(" ] }");

        } catch (Exception e) {
            LOG.error("Error occurred while building query: ", e.getMessage());
            //Return default query to continue further processing
            return defaultQuery;
        }

        return query.toString();
    }

    /**
     * Validates basic elements of filter.
     *
     * @param filter
     * @return
     */
    private static boolean isFilterValid(Map filter) {
        return filter != null
                && filter.get(IHConstants.FILTER_NAME) != null
                && filter.get(IHConstants.VALUE_TYPE) != null
                && filter.get(IHConstants.NESTED_ON) != null
                && filter.get(IHConstants.SEARCH_TYPE) != null;
    }
}
