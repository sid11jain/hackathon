package com.innovationshub.webapp.util;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
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

    public static String buildQuery(JSONObject filterConditions) {
        StringBuilder query = new StringBuilder();
        try {
            //This array will contain values of different filters
            JSONArray filtersArray = filterConditions.getJSONArray(IHConstants.FILTERS);
            //for each filer, add query in 'and' clause
            query.append("{ $and : [ ");
            for (int filterIndex = 0; filterIndex < filtersArray.length(); filterIndex++) {
                JSONObject filter = (JSONObject) filtersArray.get(filterIndex);
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
                        query.append(" { \'" + IHConstants.CAMPAIGN_VALUES + "." + filterName + "\': { $in: [");
                    }
                    JSONArray values = filter.getJSONArray(IHConstants.VALUES);
                    for (int valIndex = 0; valIndex < values.length(); valIndex++) {
                        String value = (String) values.get(valIndex);
                        query.append("\"" + value + "\"");
                        if (valIndex != values.length() - 1) {
                            query.append(",");
                        }
                    }
                    query.append("] } }");
                }
                if (filterIndex != filtersArray.length() - 1) {
                    query.append(",");
                }
            }
            query.append(" ] }");

        } catch (Exception e) {
            LOG.error("Error occurred while building query: ", e.getMessage());
        }

        return query.toString();
    }
}
