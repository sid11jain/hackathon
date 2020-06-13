package com.innovationshub.webapp.util;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
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
        JSONObject data = new JSONObject();
        JSONArray filters = new JSONArray();
        JSONObject obj1 = new JSONObject();
        obj1.put(IHConstants.FILTER_NAME, "name");
        obj1.put(IHConstants.VALUE_TYPE, IHConstants.STRING_TYPE);
        JSONArray arr1 = new JSONArray();
        arr1.put("name1");
        arr1.put("name2");
        obj1.put(IHConstants.VALUES, arr1);

        JSONObject obj2 = new JSONObject();
        obj2.put(IHConstants.FILTER_NAME, "Technology");
        obj2.put(IHConstants.VALUE_TYPE, IHConstants.STRING_TYPE);
        JSONArray arr2 = new JSONArray();
        arr2.put("Java");
        arr2.put("C");
        obj2.put(IHConstants.VALUES, arr2);
        filters.put(obj1);
        filters.put(obj2);

        data.put(IHConstants.FILTERS, filters);

        DBUtility.buildQuery(data);
    }
}
