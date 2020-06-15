package com.innovationshub.webapp.services.impl;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.innovationshub.webapp.common.IHConstants;
import com.innovationshub.webapp.services.api.IHubDao;

/**
 * @author AJAYLAMBA
 * @since Jun 14, 2020 8:23 PM
 */
@SpringBootTest
public class HubServiceImplTest {

    @Test
    public void testBuildData() throws Exception {

        HubServiceImpl hubService = new HubServiceImpl();
        JSONObject ideaData = new JSONObject();
        ideaData.put(IHConstants.NAME_FIELD, "name1");
        ideaData.put(IHConstants.DESCRIPTION_FIELD, "description");
        JSONObject campaignValues = new JSONObject();
        JSONArray campaignValuesArr = new JSONArray();
        JSONObject cValuesObj1 = new JSONObject();
        JSONArray valuesArray = new JSONArray();

        JSONObject valueArrObj1 = new JSONObject();
        valueArrObj1.put("id", "java");
        valueArrObj1.put("value", "java");
        JSONObject valueArrObj2 = new JSONObject();
        valueArrObj2.put("id", "python");
        valueArrObj2.put("value", "python");

        valuesArray.put(valueArrObj1);
        valuesArray.put(valueArrObj2);
        cValuesObj1.put("Technology", valuesArray);
        campaignValuesArr.put(cValuesObj1);

        ideaData.put("campaignValues", campaignValuesArr);

        JSONObject exportableData = hubService.flattenJSONObjectForIdea(ideaData);
        System.out.println(exportableData);
    }

    @Test
    public void testBuildDataByInsertingData() throws Exception {
        JSONObject data = new JSONObject("{\n"
                + "    \"name\" : \"AjayIdea\",\n"
                + "    \"description\" : \"desc\",\n"
                + "    \"PostedOn\" : \"14-06-20\",\n"
                + "    \"campaignName\" : \"AjayCampaign\",\n"
                + "    \"submittedBy\" : \"Ajay\",\n"
                + "    \"contributors\" : \"AJ\",\n"
                + "    \"campaignValues\" : [ \n"
                + "        {\n"
                + "            \"Technology\" : [ \n"
                + "                {\n"
                + "                    \"id\" : \"java\",\n"
                + "                    \"value\" : \"java\"\n"
                + "                }, \n"
                + "                {\n"
                + "                    \"id\" : \"python\",\n"
                + "                    \"value\" : \"python\"\n"
                + "                }\n"
                + "            ]\n"
                + "        }, \n"
                + "        {\n"
                + "            \"RAGStatus\" : [ \n"
                + "                {\n"
                + "                    \"id\" : \"Green\",\n"
                + "                    \"value\" : \"Green\"\n"
                + "                }, \n"
                + "                {\n"
                + "                    \"id\" : \"Red\",\n"
                + "                    \"value\" : \"Red\"\n"
                + "                }\n"
                + "            ]\n"
                + "        }\n"
                + "    ]\n"
                + "}");
        IHubDao iHubDao = new HubDaoImpl();
        iHubDao.addIdea(data);


        HubServiceImpl hubService = new HubServiceImpl();
        JSONArray retreivedIdeas = hubService.exportAllIdeasForCampaign("AjayCampaign");

    }

}
