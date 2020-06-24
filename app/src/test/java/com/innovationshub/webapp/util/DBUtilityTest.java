package com.innovationshub.webapp.util;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.innovationshub.webapp.common.IHConstants;

/**
 * Test class for {@link DBUtility}.
 *
 * @author AJAYLAMBA
 * @since Jun 13, 2020 10:19 PM
 */
@SpringBootTest
public class DBUtilityTest {

    @Test
    public void testBuildQuery() throws Exception {
        String expectedQuery =
                "{ $and : [  { campaignName: {'$regex':'test','$options': 'i'}}, { tags: {'$regex':'Technology','$options': 'i'}} ] }";
        Map<String, ArrayList> searchCriteria = new LinkedHashMap<>();
        ArrayList<LinkedHashMap> filter1 = new ArrayList<>();
        ArrayList<String> valuesArray1 = new ArrayList<>();
        valuesArray1.add("test");
        LinkedHashMap values1 = new LinkedHashMap();
        values1.put(IHConstants.VALUE_TYPE, "string");
        values1.put(IHConstants.COMPARISON_OP, "EQ");
        values1.put(IHConstants.NESTED_ON, false);
        values1.put(IHConstants.FILTER_NAME, IHConstants.CAMPAIGN_NAME);
        values1.put(IHConstants.VALUES, valuesArray1);
        values1.put(IHConstants.NESTED_FIELD, "");
        values1.put(IHConstants.SEARCH_TYPE, IHConstants.LIKE_SEARCH);
        filter1.add(values1);

        ArrayList<String> valuesArray2 = new ArrayList<>();
        valuesArray2.add("Technology");
        LinkedHashMap values2 = new LinkedHashMap();
        values2.put(IHConstants.VALUE_TYPE, "string");
        values2.put(IHConstants.COMPARISON_OP, "EQ");
        values2.put(IHConstants.NESTED_ON, false);
        values2.put(IHConstants.FILTER_NAME, IHConstants.TAGS_COLLECTION);
        values2.put(IHConstants.VALUES, valuesArray2);
        values2.put(IHConstants.NESTED_FIELD, "");
        values2.put(IHConstants.SEARCH_TYPE, IHConstants.LIKE_SEARCH);
        filter1.add(values2);

        searchCriteria.put(IHConstants.FILTERS, filter1);

        String query = DBUtility.buildQuery(searchCriteria);
        Assert.assertEquals(expectedQuery, query);
    }

    @Test
    public void testBuildQueryWithNestedOn() throws Exception {
        String expectedQuery =
                "{ $and : [  { name: {'$regex':'test','$options': 'i'}}, { 'campaignValues.campaignName.value': {'$regex':'Technology','$options': 'i'}} ] }";

        Map<String, ArrayList> searchCriteria = new LinkedHashMap<>();
        ArrayList<LinkedHashMap> filter1 = new ArrayList<>();
        ArrayList<String> valuesArray1 = new ArrayList<>();
        valuesArray1.add("test");
        LinkedHashMap values1 = new LinkedHashMap();
        values1.put(IHConstants.VALUE_TYPE, "string");
        values1.put(IHConstants.COMPARISON_OP, "EQ");
        values1.put(IHConstants.NESTED_ON, false);
        values1.put(IHConstants.FILTER_NAME, IHConstants.NAME_FIELD);
        values1.put(IHConstants.VALUES, valuesArray1);
        values1.put(IHConstants.NESTED_FIELD, "");
        values1.put(IHConstants.SEARCH_TYPE, IHConstants.LIKE_SEARCH);
        filter1.add(values1);

        ArrayList<String> valuesArray2 = new ArrayList<>();
        valuesArray2.add("Technology");
        LinkedHashMap values2 = new LinkedHashMap();
        values2.put(IHConstants.VALUE_TYPE, "string");
        values2.put(IHConstants.COMPARISON_OP, "EQ");
        values2.put(IHConstants.NESTED_ON, true);
        values2.put(IHConstants.FILTER_NAME, IHConstants.CAMPAIGN_NAME);
        values2.put(IHConstants.VALUES, valuesArray2);
        values2.put(IHConstants.NESTED_FIELD, IHConstants.CAMPAIGN_VALUES);
        values2.put(IHConstants.SEARCH_TYPE, IHConstants.LIKE_SEARCH);
        filter1.add(values2);

        searchCriteria.put(IHConstants.FILTERS, filter1);

        String query = DBUtility.buildQuery(searchCriteria);
        Assert.assertEquals(expectedQuery, query);
    }
}
