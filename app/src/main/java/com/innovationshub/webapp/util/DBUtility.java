package com.innovationshub.webapp.util;

import java.util.ArrayList;
import java.util.LinkedHashMap;
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

    public static String buildQuery(Map filterConditions) {
        String defaultQuery = "{}";
        StringBuilder query = new StringBuilder();
        try {
            if (filterConditions == null || filterConditions.size() == 0) {
                return defaultQuery;
            }
            //TODO: Implement logic seach based on key, instead of value
            //TODO: Implement logic to search text like
            //This array will contain values of different filters
            ArrayList<LinkedHashMap> filtersList = (ArrayList) filterConditions.get(IHConstants.FILTERS);
            if (filtersList == null || filtersList.size() == 0) {
                return defaultQuery;
            }
            //for each filer, add query in 'and' clause
            query.append("{ $and : [ ");
            for (int filterIndex = 0; filterIndex < filtersList.size(); filterIndex++) {
                LinkedHashMap filter = filtersList.get(filterIndex);
                String filterName = (String) filter.get(IHConstants.FILTER_NAME);
                String valueType = (String) filter.get(IHConstants.VALUE_TYPE);
                //each filer can have more than one value
                //we need to add 'in' clause for these values
                if (IHConstants.STRING_TYPE.equals(valueType)) {
                    //if field is one of the static field in idea, directly add the field name
                    if (IHConstants.IDEA_STATIC_FIELDS.contains(filterName)) {
                        query.append(" { " + filterName + ": { $in: [");
                    } else {
                        //if field is part of campaign values, search nested document
                        query.append(" { \'" + IHConstants.CAMPAIGN_VALUES + "." + filterName + "." + IHConstants.VALUE_FIELD + "\': { $in: [");
                    }
                    ArrayList values = (ArrayList) filter.get(IHConstants.VALUES);
                    // values.removeAll(Arrays.asList(null,"")); -- this can be used to remove null values
                    for (int valIndex = 0; valIndex < values.size(); valIndex++) {
                        String value = (String) values.get(valIndex);
                        query.append("\"" + value + "\"");
                        if (valIndex != values.size() - 1) {
                            query.append(",");
                        }
                    }
                    query.append("] } }");
                }
                if (filterIndex != filtersList.size() - 1) {
                    query.append(",");
                }
            }
            query.append(" ] }");

        } catch (Exception e) {
            LOG.error("Error occurred while building query: ", e.getMessage());
            //Return empty string as query to continue further processing
            return "";
        }

        return query.toString();
    }
}
